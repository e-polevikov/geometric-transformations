

export function MetricsDisplay({ metrics }) {
  /*
  const sumOfDistances = getSumOfDistances(
    figure.points[figure.stateIdx],
    targetFigure.points, gridIndent
  );

  const areaIntersectionRatio = getAreaIntersectionRatio(
    figure.points[figure.stateIdx],
    targetFigure.points, gridIndent    
  );
  */

  /*
  const figure1 = figures[0];
  const figure2 = figures[1];

  const pathLength = getPathLength(
    figure1.points.slice(0, figure1.stateIdx + 1),
    gridIndent
  ) + getPathLength(
    figure2.points.slice(0, figure2.stateIdx + 1),
    gridIndent
  );

  const numTransformations = figure1.stateIdx + figure2.stateIdx;

  const intersectionRatio = getAreaIntersectionRatio(
    figure1.points[figure1.stateIdx],
    figure2.points[figure2.stateIdx],
    gridIndent
  );
  */

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
          <td style={tableDataStyle}>{metrics.intersectionRatio.toFixed(3)}</td>
          <td style={tableDataStyle}>{metrics.pathLength.toFixed(3)}</td>
          <td style={tableDataStyle}>{metrics.numTransformations}</td>
        </tr>
      </table>
    </>
  );
}
