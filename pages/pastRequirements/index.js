import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getReports} from "../../redux/mailMessages/index";
import CountCard from '@/components/CountCard';
import TableData from '@/components/TableData';
import FilterCard from '@/components/FilterCard';

function index() {

    let data =  useSelector(state => state.reports)
    let dispatch = useDispatch()


    let apiObject = {page:0,user:localStorage.getItem('email')}

    React.useEffect(() => {
        dispatch(getReports(apiObject))
    },[])

    console.log(data.data)


  return (
    <>
            <div className="count-card mb-3">
    <CountCard 
        loading={data.loading}
        data={[
          {name:'Total Campaigns',count:data.totalCount},
        ]} />
    </div>
      <div className="card">
        <div className="card-body">
          
          <div className="row">
            <div className="col-lg-12">
              {/* <FilterCard 
                      objectData={apiObject}
                      paginateApi={getReports}
                      download={null}
                      dataDownload={data.data.data}
                      data={[
                        {label:"Email ID",type:"text",value:"email"},
                      ]} 
                      title=""
                      arrayData={['']}
                    /> */}

              <TableData
                      data={data} 
                      deleteOption={false}
                      filters={{}}
                      paginate={true}
                      paginateApi={getReports}
                      apiObject={apiObject}
                      arrayData={[
                        {name:'timestamp',date: true,label:'Date'},
                        {name:'name',label:'name'},
                        {name:'location',label:'location'},
                        {name:'experience',label:'experience'},
                        {name:'duration',label:'duration'},
                        {name:'mandatory',label:'mandatory'},
                        {name:'secondary',label:'secondary'},
                        {name:'campaignId',type:"button",label:'View Stats'},
                        {name:'campaignId',type:"resend",label:'Resend'},
                      ]}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index;