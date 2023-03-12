import { Breadcrumb, Input, Dropdown, Button } from 'antd';
import { SearchOutlined, UserOutlined,AlignLeftOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import {capitalizeFirstLetter} from "../utils/textUtils"
import {loginStatus} from "../redux/auth/userSlice";
import { useDispatch } from 'react-redux';


function Header({activeSidebar,setActiveSidebar,targetReached}) {
 
 const router = useRouter();
 let dispatch = useDispatch()

 const items = [
    {
      key: '1',
      label: (
        <div className="d-flex align-items-center justify-content-between item-profile">
            <UserOutlined className="me-2 icon-main" />
            <p className='big-p'>My Profile</p>
        </div>
      ),
    },
    {
        key: '2',
        label: (
          <div className="d-flex align-items-center justify-content-start item-profile">
              <LogoutOutlined className="me-2 icon-main" />
              <p onClick={() => {
                localStorage.clear();
                dispatch(loginStatus({loggedIn:false}))
              }} className='big-p'>Logout</p>
          </div>
        ),
      },
  ];

 let name = capitalizeFirstLetter(router.pathname == "/" ? 'Dashboard' : router.pathname.split('/')[1])

  return (
    <>
        <div className="d-flex justify-content-between align-items-center flex-wrap header">
            <div>
                {
                    targetReached == true ?
                        <AlignLeftOutlined className="icon" onClick={() => setActiveSidebar(!activeSidebar)} />
                    : null
                }
                {/* <AlignLeftOutlined className="icon" onClick={() => setActiveSidebar(!activeSidebar)} /> */}
            </div>
            <div className="d-flex align-items-center">
                <div className="me-3">
                    {/* <Input size="large" placeholder="Type here..." prefix={<SearchOutlined />} /> */}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <p className="me-2 bold">John Doe</p>
                            <p className='me-2 light'>App Admin</p>
                        </div>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                            >
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className='logo-img' />
                        </Dropdown>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header