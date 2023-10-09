// 로그인 관련 api
// 이런식으로 컴포넌트 또는 페이지별 필요햔 api들 파일에 모아놓기

import { client } from "./axios";

export const getLogin = async () => {
  try {
    const data = await client.get('/oauth2/authorization/github');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
