import React from "react";
import { Line as LineChart } from "react-chartjs";

// TODO: refactor business logic
// TODO: proptypes
const setData = (naps, dateObjs) => {
  const temps = [];
  const humids = [];
  const lengths = [];

  const dateFilter = (naps, date) =>
    naps.filter(nap => {
      const napDate = new Date(date);
      const lo = Number(
        new Date(napDate.getFullYear(), napDate.getMonth(), napDate.getDate())
      );
      const hi = Number(new Date(lo + 24 * 60 * 60 * 1000 - 1));
      return nap.data.date >= lo && nap.data.date < hi;
    });

  if (naps.length > 0) {
    dateObjs.forEach(date => {
      const napsOnDate = dateFilter(naps, date);
      const dayTemps = [];
      const dayHumids = [];
      const dayLengths = [];

      napsOnDate.forEach(nap => {
        dayTemps.push(nap.data.temp);
        dayHumids.push(nap.data.humidity);
        dayLengths.push(nap.data.length / 60);
      });

      lengths.push(
        dayLengths.length > 0
          ? Math.round(dayLengths.reduce((acc, cur) => acc + cur))
          : null
      );

      humids.push(
        dayHumids.length > 0
          ? Math.round(
              dayHumids.reduce((acc, cur) => acc + cur) / napsOnDate.length
            )
          : null
      );

      temps.push(
        dayTemps.length > 0
          ? Math.round(
              dayTemps.reduce((acc, cur) => acc + cur) / napsOnDate.length
            )
          : null
      );
    });
  }

  const data = [
    {
      label: "Avg Temp",
      fillColor: "rgba(254,250,192,0.2)",
      strokeColor: "rgba(254,250,192,1)",
      pointColor: "rgba(254,250,192,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(254,250,192,1)",
      data: temps
    },
    {
      label: "Avg Humidity",
      fillColor: "rgba(168,198,250,0.2)",
      strokeColor: "rgba(168,198,250,1)",
      pointColor: "rgba(168,198,250,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(168,198,250,1)",
      data: humids
    },
    {
      label: "Total Naptime (mins)",
      fillColor: "rgba(203,232,186,0.2)",
      strokeColor: "rgba(203,232,186,1)",
      pointColor: "rgba(203,232,186,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(203,232,186,1)",
      data: lengths
    }
  ];

  return data;
};

const options = {
  // /Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  // String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",

  // Number - Width of the grid lines
  scaleGridLineWidth: 1,

  // Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  // Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  // Boolean - Whether the line is curved between points
  bezierCurve: true,

  // Number - Tension of the bezier curve between points
  bezierCurveTension: 0.3,

  // Boolean - Whether to show a dot for each point
  pointDot: true,

  // Number - Radius of each point dot in pixels
  // pointDotRadius: 4,

  // Number - Pixel width of point dot stroke
  // pointDotStrokeWidth: 1,

  // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  // pointHitDetectionRadius: 20,

  // Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  // Number - Pixel width of dataset stroke
  datasetStrokeWidth: 3,

  // Boolean - Whether to fill the dataset with a colour
  datasetFill: true

  // String - A legend template
  // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>">' +
  // '<%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',
};

const setDayLabels = naps => {
  const dates = naps.map(nap => nap.data.date);
  const earliestDate = dates[0];
  const latestDate = Number(new Date());
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const DAYS_SPAN = Math.ceil((latestDate - earliestDate) / DAY_IN_MS);
  const dayLabels = [];
  const dateObjs = []; // A date object for each day in day span

  for (let i = 0; i <= DAYS_SPAN; i += 1) {
    const thisDate = new Date(earliestDate + i * DAY_IN_MS);
    const dateStr = `${thisDate.getMonth() + 1}/${thisDate.getDate()}`;
    dateObjs.push(thisDate);
    dayLabels.push(dateStr);
  }

  return [dayLabels, dateObjs];
};

const DataChart = props => {
  const [dayLabels, dateObjs] = setDayLabels(props.naps);
  const data = {
    labels: dayLabels,
    datasets: setData(props.naps, dateObjs)
  };

  return (
    <div className="data-chart">
      <LineChart data={data} options={options} width="640" height="474" />
    </div>
  );
};

export default DataChart;
