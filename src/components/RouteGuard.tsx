import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserLoginInfo from '@/helper/useSession';

export default function RouteGuard({ children }: any) {
  const router = useRouter()
  const { isLogin } = useUserLoginInfo()

  useEffect(() => {
    if (!isLogin) {
      router.replace('/');
    }
  }, []);

  return children

}