import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react';
import useUserLoginInfo from '../helper/useSession'


function Tooltip({ }: any) {
  const router = useRouter()
  const { user, isLogin } = useUserLoginInfo();

  return (
    <div className="group flex relative">
    <span className="bg-red-400 text-white px-2 py-1">Button</span>
    <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Tooltip</span>
</div>
  )
}

export default Tooltip