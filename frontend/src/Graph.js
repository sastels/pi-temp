import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";
import moment from "moment"

const chartConfig = (name, data) => {
//   data.sort((a, b) => {
//     if (a[0] < b[0]) {
//       return -1;
//     } else if (a[0] > b[0]) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

  return {

    legend: {
      enabled: false
    },
    title: {
      text: name
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: name
      },
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: [
      {
        data: data,
        name: name,
        type: "spline",
        color: "blue",
      }
    ]
  };
};

const Graph = props => (
    <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={
        chartConfig('Temperature (C)', props.data.map(m => [m.datetime.valueOf(), m.temperature]))
        }
    />
    <HighchartsReact
        highcharts={Highcharts}
        options={
        chartConfig('Humidity (%)', props.data.map(m => [m.datetime.valueOf(), m.humidity]))
        }
    />
  </div>
)

export default Graph
