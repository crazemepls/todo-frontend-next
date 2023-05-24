import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserLoginInfo from '@/helper/useSession';
import Home from '@/pages';
import axios from 'axios'

export default function RouteGuard({ children }: any) {
    const { isLogin } = useUserLoginInfo()
//fetch with "getServerSideProps"
const aa = async () => {
    const req = await axios.get(`https://3t5qygoujf.execute-api.ap-southeast-2.amazonaws.com/production/`)
    const res = await req.data
  
    
  
    return {
      props: {
        todos: res, // <-- assign response
      },
    }
}

    if (!isLogin) {
        return <Home props={aa}/>
    }
    else{
        return children
    }

}