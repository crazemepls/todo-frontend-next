import { useSession } from 'next-auth/react';

export default function useUserLoginInfo() {
  const { data, status } = useSession();
  const isLogin = status === 'authenticated' ? true : false

  return { user:data?.user, status, isLogin };
}