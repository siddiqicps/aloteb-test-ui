import * as React from "react";

// const authContext = React.createContext();

export default function useAuth() {
  const [authStatus, setAuthStatus] = React.useState();
  const [branch, setBranch] = React.useState();
  const [branchName, setBranchName] = React.useState();

  React.useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthStatus(true)
    }else{
      setAuthStatus(false)
    }
    if(localStorage.getItem('branch')){
      setBranch(localStorage.getItem('branch'))
    }else{
      setBranch(null)
    }
    if(localStorage.getItem('name')){
      setBranchName(localStorage.getItem('name'))
    }else{
      setBranchName(null)
    }
  },[])

  return { authStatus, branch, branchName };
  // return {
  //   authStatus,
  //   login() {
  //     return new Promise((res) => {
  //       console.log("##########3",res)
  //       setAuthStatus(true);
  //       res();
  //     });
  //   },
  //   logout() {
  //     return new Promise((res) => {
  //       setAuthStatus(false);
  //       res();
  //     });
  //   },
  // };
}

// export function AuthProvider({ children }) {
//   const auth = useAuth();

//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export default function AuthConsumer() {
//   return React.useContext(authContext);
// }