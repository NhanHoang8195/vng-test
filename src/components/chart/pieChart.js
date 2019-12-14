import React from "react";
import PropTypes from "prop-types";
import './styles.scss';

const WIDTH = 200;
const HEIGHT = 200;
const RADIUS = 100;
const START_POINT = {
  X: RADIUS,
  Y: 0
};
const VIEW_BOX = `-${WIDTH / 2} -${HEIGHT / 2} ${WIDTH} ${HEIGHT}`;
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent) * 100;
  const y = Math.sin(2 * Math.PI * percent) * 100;

  return { X: x, Y: y };
}

function generateAttributes(att, points, percent) {
  if (att === "A") {
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    return `A${RADIUS},${RADIUS} 0 ${largeArcFlag},1 ${points.X},${points.Y}`;
  }
  return `${att}${points.X},${points.Y}`;
}
function generatePathData(startPoint, endPoint, percent) {
  const m = generateAttributes("M", { X: 0, Y: 0 });
  const l = generateAttributes("L", startPoint);
  const a = generateAttributes("A", endPoint, percent);
  return [m, l, a].join(" ") + " Z";
}

function getPoints() {
  let startPoint = START_POINT;
  let previousPercent = 0;
  return percent => {
    const endPoint = getCoordinatesForPercent(percent + previousPercent);
    const result = generatePathData(startPoint, endPoint, percent);
    startPoint = endPoint;
    previousPercent += percent;
    return result;
  };
}

function getTotal(data = []) {
  return data.reduce((acc, dt) => acc += dt.value, 0);
}

const getPathData = getPoints();

function PieChart(props) {
  const { data } = props;
  if (data.length < 1) {
    return null;
  }
  return (<div className="pie-chart-container">
    <div className="title-pie-chart">
      Biểu đồ thể hiện sự phân bố của các loại khách hàng.
    </div>
    <div className="pie-chart">
      <svg height={HEIGHT} width={WIDTH} viewBox={VIEW_BOX}>
        {data.map((dt, idx) => {
          const percent = dt.value / getTotal(data);
          return (
            <path
              id={dt.title}
              key={idx}
              d={getPathData(percent)}
              fill={dt.color}
            />
          );
        })}
      </svg>
      <div className="note-container">
        {data.map((dt) => {
          const percent = (dt.value / getTotal(data) * 100).toFixed(2);
          return (
            <div key={dt.title} className="note-item">
              <div className="note" style={{backgroundColor: dt.color}} />
              <span>{dt.title}: {percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>);
}

PieChart.propTypes = {
  data: PropTypes.array,
};
PieChart.defaultProps = {
  data: [{}],
};

export default PieChart;
