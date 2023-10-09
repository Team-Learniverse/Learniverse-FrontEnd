import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginContainer = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const token = params.get('token');

    /** in case of user has problem with kakao auth server */
    if (token === null) {
      console.log(params);
      console.log(code);
      router.push('/');
      return;
    }

    try {
      console.log(token);
      router.push('/home');
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  }, []);
  return <p>로그인 페이지</p>;
};

export default LoginContainer;
