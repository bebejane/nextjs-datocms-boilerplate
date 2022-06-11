import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePreviousRoute = () : string => {
  
  const storage = globalThis.sessionStorage
  const router = useRouter()
  const [prevRoute, setPrevRoute] = useState<string>(typeof storage !== 'undefined' ? storage.getItem('previousRoute') : null)

	useEffect(()=>{
    
    const prevRoute = storage.getItem('currentRoute');
    if (prevRoute === router.asPath) return
    //console.log(prevRoute, '>', router.asPath, )
    storage.setItem('previousRoute', prevRoute)
    storage.setItem("currentRoute", router.asPath);
    setPrevRoute(prevRoute)
	}, [router.asPath])	

  return prevRoute
};

export default usePreviousRoute