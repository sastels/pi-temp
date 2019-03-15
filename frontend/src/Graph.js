import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

const chartConfig = (data) => {
  return {
    colors: ['red', 'blue'],
    chart: {
      zoomType: "x",
      panKey: "meta",
      panning: true
    },
    legend: {
      enabled: true
    },
    tooltip: {
      crosshairs: [true, false],
      shared: true
    },
    title: {
      text: "Temperature and Humidity"
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: [{
      gridLineWidth: 0,
      labels: {
        format: '{value}°C',
        style: {
          color: 'red'
        }
      },
      title: {
        text: "Temperature",
        style: {
          color: 'red'
        }
      },
    },
    { // secondary y axis
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
        name: 'Temperature',
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
      {
        name: 'Humidity',
        yAxis: 1,
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
      }
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
