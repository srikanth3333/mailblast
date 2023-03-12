import { Input,Select, DatePicker,Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import FilterCard from './FilterCard';
import { Skeleton, Popover} from 'antd';

function HomeCard({title,countArray,divisionList,monthList,apiObject,api,data}) {
  return (
    <div>
        <div className="card mt-3">
        <div className="card-body">
            <h2 className="title">{title}</h2>
             <FilterCard 
                    objectData={apiObject}
                    colFix={'col-lg-6'}
                    paginateApi={api}
                    download={null}
                    dataDownload={[]}
                    hierarchyStatus={false} 
                    data={[
                        {label:"Divison",type:"select",value:"division",filterList:divisionList},
                        {label:"Month",type:"select",value:"month",filterList:monthList},
                        {label:"Start Date",type:"date",value:"startDate"},
                        {label:"End Date",type:"date",value:"endDate"},
                    ]} 
                    title=""
                />
                <div className="row mt-3 justify-content-center">
                    {
                        data?.loading ?
                            [1,2,3,4].map((list,index) => (
                                <div className="col-lg-6 mt-3">
                                    <Skeleton active 
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        size="large"
                                        className="border p-3"
                                        style={{height:'140px',borderRadius:'10px'}}
                                    />
                                </div>
                            ))
                        :
                        countArray && countArray.map((item,index) => (
                            <div className="col-lg-6 mt-3 d-flex align-items-stretch" key={index}>
                                <div className={index % 3 == 0 ? `card color-yellow w-100` : `card color-grey w-100`}>
                                    <div className="card-body">
                                        <h5 className="box-card-title">&#8377;{item.count}</h5>
                                        <h5 className="box-card-text">{item.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeCard