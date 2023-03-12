import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { Skeleton, Popover} from 'antd';


const BarChart = ({data,loading,items}) => {


    if(loading) {
        return (
            <Skeleton active 
                paragraph={{
                    rows: 10,
                }}
                size="small"
            />
        )
    }
  
    return (
        <div className="row my-4">
            {
                items.map((item,index) => (
                    <div className="col-lg-12" key={index}>
                        <h5 className='my-4'><b>{item.title}</b></h5>
                        <Chart id="chart" dataSource={data}>
                            <Series
                                valueField={item.valueField}
                                argumentField={item.argumentField}
                                type="bar"
                                color="#F7C514" 
                            />
                        </Chart>
                    </div>
                ))
            }
        </div>
    );
}

export default BarChart;
