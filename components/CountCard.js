import Icon, { PieChartOutlined,ProjectFilled,ThunderboltFilled,
    SignalFilled,ReconciliationFilled,CloudFilled,
    ContainerFilled,ControlFilled,CompassFilled,
    DashboardFilled,BookFilled } from '@ant-design/icons';
import { Skeleton, Popover} from 'antd';
var humanize = require('humanize-number');

let icons = [
    "ProjectFilled",
    "ThunderboltFilled",
    "SignalFilled",
    "ReconciliationFilled",
    "CloudFilled",
    "ContainerFilled",
    "ControlFilled",
    "CompassFilled",
    "DashboardFilled",
    "BookFilled",
    "PieChartOutline"
]

function CountCard({data,loading}) {
    
  return (
    <>
        <div className="row mt-4">
            {
                loading ?
                    data.map((list,index) => (
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <Skeleton active 
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                :
                data.map((list,i) => (
                    <div className="col-lg-4" key={i}>
                        <div className={i >= 3 ? "card mt-3 shadow" : "card shadow"}>
                            <div className="card-body">
                                <div className="d-flex count-card-icon align-items-center justify-content-between">
                                    <div>
                                        <Popover content={list.name} title="Name">
                                            <p className="count-name">{list.name}</p>
                                        </Popover>
                                        <Popover content={humanize(Math.round(list.count))} title="Count">
                                            <p className="count-count">{humanize(Math.round(list.count))}</p>
                                        </Popover>
                                    </div>
                                    <PieChartOutlined className="count-icon" twoToneColor="#F7C514" />
                                    {/* <Icon component={<ProjectFilled />}  /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        
    </>
  )
}

export default CountCard