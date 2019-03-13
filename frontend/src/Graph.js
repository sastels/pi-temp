import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";
import moment from "moment"

const chartConfig = data => {
  data.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  });

  return {

    legend: {
      enabled: false
    },
    title: {
      text: "Temperatures"
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Temp"
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
        name: "Temperature",
        type: "spline",
        color: "blue",
      }
    ]
  };
};

const Graph = props => (
  <HighchartsReact
    highcharts={Highcharts}
    options={
      chartConfig(props.data.map(m => [m.datetime.valueOf(), m.temperature]))
    }
  />
)

export default Graph
