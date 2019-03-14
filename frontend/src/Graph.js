import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

const chartConfig = (data) => {
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
    colors: ['blue', 'red'],
    chart: {
      zoomType: "x",
      panKey: "meta",
      panning: true
    },
    legend: {
      enabled: false
    },
    title: {
      text: "Temperature and Humidity"
    },
    xAxis: {
      type: "datetime",

    },
    yAxis: [{
      opposite: true,
      labels: {
        format: '{value} %',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      title: {
        text: "Humidity",
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
    },
    { // secondary y axis
      gridLineWidth: 0,
      labels: {
        format: '{value}°C',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: "Temperature",
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
    }],
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Humidity',
        type: 'spline',
        data: data.map(d => [d.datetime.valueOf(), d.humidity]),
        marker: {
          enabled: false
        },
        dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 1,
          valueSuffix: ' %'
        }
    
      },
      {
        name: 'Temperature',
        yAxis: 1,
        type: 'spline',
        data: data.map(d => [d.datetime.valueOf(), d.temperature]),
        tooltip: {
          valueDecimals: 1,
          valueSuffix: '°C'
        },
        marker: {
          enabled: false
        },
    
      },
    ]
  };
};

const Graph = props => (
    <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={
        chartConfig(props.data)
        }
    />
  </div>
)

export default Graph
