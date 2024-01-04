import { Line } from 'react-konva';

function generateGridPoints(stageWidth, stageHeight, indent) {
  let gridPoints = [];

  for (let i = 1; i * indent < stageWidth; i++) {
    let points = {
      x1: i * indent, y1: 0,
      x2: i * indent, y2: stageWidth
    };

    gridPoints.push(points);
  }

  for (let i = 1; i * indent < stageHeight; i++) {
    let points = {
      x1: 0, y1: i * indent,
      x2: stageWidth, y2: i * indent
    };

    gridPoints.push(points);
  }
  
  return gridPoints;
}

export function StageGrid({ stageWidth, stageHeight, indent }) {
  const gridPoints = generateGridPoints(stageWidth, stageHeight, indent);

  return (
    <>
      {gridPoints.map((points) => (
        <Line
          points={[points.x1, points.y1, points.x2, points.y2]}
          stroke={'black'}
          strokeWidth={0.2}
        />
      ))}
    </>
  );
}
