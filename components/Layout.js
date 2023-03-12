import React from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import {loginStatus} from "../redux/auth/userSlice";

function Layout({children}) {

    const [targetReached, setTargetReached] = React.useState(false)
    const [activeSidebar, setActiveSidebar] = React.useState(true)
    let user = useSelector(state => state.auth)
    let dispatch = useDispatch()

    const updateTarget = React.useCallback((e) => {
      if (e.matches) {
        setTargetReached(true)
      }else {
        setActiveSidebar(true)
        setTargetReached(false)
      }
    }, [])

    React.useEffect(() =>
    {
      const media = window.matchMedia(`(max-width: ${"1228"}px)`)
      media.addEventListener('change', updateTarget)
      if (media.matches) setTargetReached(true)
      return () => media.removeEventListener('change', updateTarget)
    }, [])


    React.useEffect(() => {
      let email = localStorage.getItem('email');
      if(!email) {
        dispatch(loginStatus({loggedIn: false}))
      }else {
        dispatch(loginStatus({loggedIn: true}))
      }
    },[])

    if(user.loggedIn == false) {
      return <Login />
    }

  return (
    <>
        <div className="banner" />
        <div className="layout index-fix">
            <div className="">
                <div className="d-flex">
                    {
                        activeSidebar == true ?
                        <div className={targetReached ==  true && activeSidebar == true ? "content-sidebar" : "default-sidebar"}>
                            <Sidebar targetReached={targetReached} activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar} />
                        </div> : null
                    }
                    <div className="content">
                        <Header targetReached={targetReached} activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar}   />
                        <div className="child-area">
                          {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}




export default Layout;