import {
  getSumOfDistances,
  getPathLength,
  getAreaIntersectionRatio
} from "../../services/Geometry";

export function ResultDisplay({
  figure,
  targetFigure,
  gridIndent
}) {
  const sumOfDistances = getSumOfDistances(
    figure.points[figure.currentStateIdx],
    targetFigure.points, gridIndent
  );

  const areaIntersectionRatio = getAreaIntersectionRatio(
    figure.points[figure.currentStateIdx],
    targetFigure.points, gridIndent    
  );

  const pathLength = getPathLength(
    figure.points.slice(0, figure.currentStateIdx + 1),
    gridIndent
  );

  const numTransformations = figure.currentStateIdx;

  const tableStyle = {
    border: "1px solid black",
    padding: "8px",
    margin: "2px",
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse"
  };

  const tableDataStyle = {
    border: "1px solid black",
    padding: "2px",
    width: "33%",
    height: "50px"
  };

  return (
    <>
      <h2 style={{textAlign: "center"}}>Результат</h2>
      <table style={tableStyle}>
        <tr>
          <td style={tableDataStyle}>S</td>
          <td style={tableDataStyle}>L</td>
          <td style={tableDataStyle}>T</td>
        </tr>
        <tr>
          <td style={tableDataStyle}>{areaIntersectionRatio}</td>
          <td style={tableDataStyle}>{pathLength}</td>
          <td style={tableDataStyle}>{numTransformations}</td>
        </tr>
      </table>
    </>
  );
}
