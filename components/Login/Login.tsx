import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { memberIdState } from '@/recoil/atom';

const Login = () => {
  const router = useRouter();

  const setMemberId = useSetRecoilState(memberIdState);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const token = params.get('token');

    if (token === null) {
      console.log(params);
      router.push('/');
      return;
    }
    try {
      console.log(token);
      localStorage.setItem('access_token', token);
      const payload: JwtPayload = jwtDecode(token);
      console.log(payload);
      const { sub } = payload;
      setMemberId(Number(sub));
      // router.push('/home');
      router.push('/signup');
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  }, []);

  return <div />;
};

export default Login;
