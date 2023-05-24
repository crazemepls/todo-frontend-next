import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { findUser } from '../hel/pers/api-service';
import useUserLoginInfo from "@/helper/useSession";

const authRoute = (Component:any) => {
    const {user, isLogin} = useUserLoginInfo()
  return (props:any) => {
    
    if (isLogin) {
      return <Component {...props}/>;
    } else {
      return null;
    }
  }
};  
export default authRoute;