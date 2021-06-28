import React from "react";
import { Line } from "react-chartjs-2";

function Graph(props) {
  const { array } = props;
  let label_data = [];
  let call_num = [];
  for (let i in array) {
    if (
      array[i].uid !== 4 &&
      array[i].uid !== 5 &&
      array[i].uid !== 7 &&
      array[i].uid !== 10
    )
      label_data.push(array[i].u_name);
  }
  for (let i in array) {
    if (
      array[i].uid !== 4 &&
      array[i].uid !== 5 &&
      array[i].uid !== 7 &&
      array[i].uid !== 10
    )
      call_num.push(array[i].call_num);
  }
  const data = {
    labels: label_data,
    datasets: [
      {
        label: "당일 전화 업무량",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: call_num,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}
export default Graph;
