import Home from "@/pages";
import useUserLoginInfo from "@/helper/useSession";

const withAuth = (Component:any) => {
    const Auth = (props:any) => {
      // Login data added to props via redux-store (or use react context for example)
      const { isLogin } = useUserLoginInfo();
        console.log(isLogin)
      // If user is not logged in, return login component
      if (!isLogin) {
        return (
          <Home props={props}/>
        );
      }
  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;