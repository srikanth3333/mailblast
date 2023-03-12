import {useEffect, useState} from 'react';
import { Input,Select, DatePicker,Button, Spin, message } from 'antd';
import {useDispatch} from 'react-redux';
import {addFilters} from "../redux/auth/userSlice";
import Download from "./Download";
// import {getHierarchyData} from "../redux/hierarchy/hierarchySlice";
import moment from 'moment';
import Messages from "./Messages";

function FilterCard({title,objectData,paginateApi,data,finalCount,
                    download,db,selectLoading,staticData,dataDownload,colFix,hierarchyStatus}) {

  const [objArr, setObjArr] = useState(objectData)
  const [showMessage, setShowMessage] = useState(false);
  

  let dispatch = useDispatch();
  let filtersObject = {
                        "category": "",
                        "circle_name": "",
                        "division_name": "",
                        "subdivision_name": "",
                        "division_name": "",
                        "sub_category": "",
                        "dc_name": "",
                        "region": "",
                        "feeder_type":"",
                        "db":db
                    }
  
  const onChangeHandler = (val,lop) => {
    setObjArr({...objArr, [lop]:val})
    dispatch(paginateApi({...objArr, [lop]:val}))
    dispatch(addFilters({"data":{...objArr, [lop]:val}}))
    // dispatch(getHierarchyData({...objArr, [lop]:val,"db":db}))
  }

  
  
    useEffect(() => {
        // hierarchyStatus == true ? dispatch(getHierarchyData(filtersObject)) : null;
    }, [dispatch]) 

  const handleReset = () => {
    setObjArr(objectData)
    dispatch(paginateApi(objectData))
    // dispatch(getHierarchyData(filtersObject))
    setShowMessage(true)
    setTimeout(() => {
        setShowMessage(false)
    }, 2000)
  }

  return (
    <>
        {showMessage && <Messages type='success' messageText="Reset was successful" />}
        <div className="row align-items-center">
            <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h3 className="filter-card-title">{title}</h3>
                    {
                     download == null ? null : download == false
                     ? <Download dataDownload={dataDownload} download={download} 
                        apiObject={objArr} finalCount={finalCount} /> :
                        download == true ?
                       <Download dataDownload={dataDownload} download={download} 
                                apiObject={objArr} finalCount={finalCount} /> : null
                    }
                </div>
            </div>
            {
                data && data.map((item, i) => {
                    if(item.type == "text") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Input placeholder={item.label} 
                                           allowClear
                                           value={objArr && objArr[item.value]}
                                           onChange={(val) => onChangeHandler(val.target.value,item.value)} 
                                    />
                                </div>
                            </>
                        )
                    }else if(item.type == "select") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                <label htmlFor="">{item.label}</label>
                                    {
                                        staticData == true
                                        ?
                                            <Select
                                                allowClear
                                                placeholder={item.label}
                                                showSearch
                                                value={objArr && objArr[item.value]}
                                                style={{ width: '100%' }}
                                                onChange={(val) => onChangeHandler(val,item.value)}
                                                >
                                                {
                                                    item.filterList?.map((val, index) => (
                                                        <Select.Option value={val} key={index}> 
                                                            {val}
                                                        </Select.Option>
                                                    ))
                                                }
                                                
                                            </Select>
                                        :
                                        <Select
                                            allowClear
                                            showSearch
                                            loading={selectLoading}
                                            value={objArr && objArr[item.value]}
                                            style={{ width: '100%' }}
                                            notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                            onChange={(val) => onChangeHandler(val,item.value)}
                                            >
                                            {
                                                selectLoading ?
                                                    <Select.Option style={{textAlign: 'center'}}> 
                                                        <Spin size="small" />
                                                    </Select.Option>
                                                : item.filterList?.map((val, index) => (
                                                    <Select.Option value={val} key={index}> 
                                                        {val}
                                                    </Select.Option>
                                                ))
                                            }
                                            
                                        </Select>
                                    }
                                    
                                </div>
                            </>
                        )
                    }else if(item.type === 'date') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <DatePicker  
                                        allowClear
                                        value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                        format="DD-MM-YYYY" 
                                        style={{width:'100%'}} 
                                        onChange={(date,dateString) => {
                                            let finalDate = moment(date).format('YYYY-MM-DD')
                                            if(finalDate == "Invalid date") {
                                                return onChangeHandler('',item.value)
                                            }else {
                                                return onChangeHandler(finalDate,item.value)
                                            }
                                        }} />
                                </div>
                            </>
                        )
                    }
                })
            }
            <div className={!colFix ? 'col-lg-3' : colFix}>
                <label htmlFor="">&nbsp;</label> <br />
                <Button type="dashed"  onClick={handleReset}>
                    Reset Filters
                </Button>
            </div>
        </div>
    </>
  )
}

export default FilterCard