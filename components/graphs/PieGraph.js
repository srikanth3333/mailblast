import React from 'react';

import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from 'devextreme-react/pie-chart';
import { useRouter } from 'next/router'

const resolveModes = ['shift', 'hide', 'none'];

const PieGraph = ({data,link,items}) => {

  
    const router = useRouter()
    
    function customizeText(arg) {
      
        return `${arg.argument} (${arg.percentText})`;
        // return `${arg.argument}`;
    }

    const onPointClick = ({ target: point }) => {
        point.select();
        
        router.push(`${link}/${point.data.analysisRemark}`);        
      }
  
    return (
      <div className="row">
        {
                items.map((item,index) => (
                    <div className="col-lg-12" key={index}>
                        <h5><b>{item.title}</b></h5>
                            <PieChart
                              id="pie"
                              dataSource={data}
                              palette="Bright"
                              title=""
                              type="doughnut"
                              // onPointClick={pointClickHandler}
                              // onLegendClick={legendClickHandler}
                              onPointClick={onPointClick}
                              resolveLabelOverlapping={resolveModes[0]}
                            >
                              <Series
                                argumentField={item.argumentField}
                                valueField={item.valueField}
                              >
                                <Label visible={true} customizeText={customizeText}>
                                  <Connector visible={true} width={1} />
                                </Label>
                              </Series>

                              <Size width={'100%'} height={500} />
                              <Export enabled={true} />
                            </PieChart>
                    </div>
                ))
          }
      </div>
      
    );
}

export default PieGraph;
