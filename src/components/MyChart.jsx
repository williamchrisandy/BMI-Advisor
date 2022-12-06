import React from 'react'
import { Chart } from 'react-charts'

export default function MyChart({rawData})
{
  var i = 1;
  var newData;
  if(rawData == null) newData = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
  else
  {
    newData = rawData.map
    (
      individualData =>
      {
        let object = {};
        object["x"] = i;
        object["y"] = individualData.data().bmiIndex;
        i++;
        return object;
      }
    );
  }

  const data = React.useMemo
  (
    () => 
    [
      {
        label: 'Series 1',
        data: newData
      }
    ],
    []
  )
 
  const axes = React.useMemo
  (
    () => 
    [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  return (
    <div style={{width: '100%', height: '22rem'}}>
      <Chart data={data} axes={axes} />
    </div>
  )
}