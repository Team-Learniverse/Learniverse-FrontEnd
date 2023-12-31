/* eslint-disable no-param-reassign */
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (config.url === `/token/refresh`) {
    config.headers.Refresh = `${localStorage.getItem('refreshToken')}`;
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  // eslint-disable-next-line func-names
  function (res) {
    return res;
  },
  async (err) => {
    const { config, response } = err;

    // 엑세스 토큰 만료시
    if (response.data.status === 401) {
      if (response.data.message === 'Unauthorized') {
        const originalRequest = config;

        // 새로운 엑세스 토큰 저장
        const data = null;
        await client.post(`/token/refresh`, data).then((res) => {
          try {
            if (res.status === 200) {
              const accessToken = res.headers.authorization;
              localStorage.setItem('accessToken', accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return axios(originalRequest);
          } catch (error) {
            console.log('토큰 재발급 실패');
            console.log(error);
            window.location.href = '/';
            throw error;
          }
        });
      }
      // 리프레시 만료시
      if (
        response.data.message ===
        'Refresh 토큰이 만료되었습니다. 로그인이 필요합니다.'
      ) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('리프레시 만료');
        window.location.href = '/';
        return;
      }
    }
    if (response.data.status === 422) {
      if (
        response.data.message ===
        '해당 시간과 겹치는 코어타임 시간이 이미 존재합니다.'
      ) {
        alert('중복된 코어타임을 입력하였습니다.');
        return;
      }
      if (response.data.message === '이미 moomScore가 4단계 입니다.') {
        return;
      }
    }
    console.log('response error', err);
  },
);

const media = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDIA_IP,
});

const ai = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_IP,
});

const mainGetFetcher = (url: string) => client.get(url).then((res) => res.data);

const mediaGetFetcher = (url: string) => media.get(url).then((res) => res.data);

const aiGetFetcher = (url: string) => ai.get(url).then((res) => res.data);

export { client, media, ai, mainGetFetcher, mediaGetFetcher, aiGetFetcher };
