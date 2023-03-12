import Link from 'next/link'
import { HomeFilled, CloseOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";


let listItems = [
    {
        label: 'Dashboard',
        link: '/'
    },
    {
        label: 'My Contacts',
        link: '/excelUpload'
    },
    {
        label: 'Past',
        link: '/pastRequirements'
    },
    {
        label: 'Add User',
        link: '/addUser'
    },
]

function Sidebar({activeSidebar,setActiveSidebar,targetReached}) {

  const router = useRouter();

  return (
    <div className="sidebar">
        <div className="card py-1 shadow-md">
            <div className="card-body">
                <div className="logo-box">
                    {
                        targetReached == true ?
                        <div className="d-flex justify-content-end">
                            <CloseOutlined className="icon-close" onClick={() => setActiveSidebar(!activeSidebar)} />
                        </div> : null
                    }
                    <div className="logo-bg">
                        <h5 className="logo-text"><b>MAIL BLAST</b></h5>
                    </div>
                </div>
                <div className="list-items">
                        {
                            listItems.map((item,i) => (
                                <Link href={`${item.link}`} onClick={() => targetReached == true ? setActiveSidebar(false) : null} key={i} className={router.pathname == `${item.link}` ? `a-active` : ''}>
                                    <div className={router.pathname == `${item.link}` ? `active d-flex list-item align-items-center` : 'd-flex list-item align-items-center'}>
                                        <div className="icon-bg">
                                            <HomeFilled className="" />
                                        </div>
                                        <p>
                                            {item.label}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;