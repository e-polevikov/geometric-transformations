import {
  getSumOfDistances,
  getPathLength,
  getAreaIntersectionRatio
} from "../../services/Geometry";

export function ResultDisplay({
  figures, gridIndent
}) {
  /*
  const sumOfDistances = getSumOfDistances(
    figure.points[figure.currentStateIdx],
    targetFigure.points, gridIndent
  );

  const areaIntersectionRatio = getAreaIntersectionRatio(
    figure.points[figure.currentStateIdx],
    targetFigure.points, gridIndent    
  );
  */

  const figure1 = figures[0];
  const figure2 = figures[1];

  const pathLength = getPathLength(
    figure1.points.slice(0, figure1.currentStateIdx + 1),
    gridIndent
  ) + getPathLength(
    figure2.points.slice(0, figure2.currentStateIdx + 1),
    gridIndent
  );

  const numTransformations = figure1.currentStateIdx + figure2.currentStateIdx;

  const intersectionRatio = getAreaIntersectionRatio(
    figure1.points[figure1.currentStateIdx],
    figure2.points[figure2.currentStateIdx],
    gridIndent
  );

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
          <td style={tableDataStyle}>{intersectionRatio.toFixed(3)}</td>
          <td style={tableDataStyle}>{pathLength.toFixed(3)}</td>
          <td style={tableDataStyle}>{numTransformations}</td>
        </tr>
      </table>
    </>
  );
}
