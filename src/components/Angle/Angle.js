import { Circle, Arc, Text, Arrow, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

function getAngle(anglePoints) {
  let point1 = anglePoints[0];
  let point2 = anglePoints[1];
  let point3 = anglePoints[2];

  let vector1 = {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };

  let vector2 = {
    x: point3.x - point2.x,
    y: point3.y - point2.y
  };

  let dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  let length1 = Math.sqrt(Math.pow(vector1.x, 2) + Math.pow(vector1.y, 2));
  let length2 = Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2));

  let angle = Math.acos(dotProduct / length1 / length2);

  return angle * 180 / Math.PI;
}

/*
function getRotation(anglePoints, gridIndent) {
  let point = {
    x: anglePoints[1].x + gridIndent,
    y: anglePoints[1].y
  };

  let rotation1 = getAngle([
    point,
    anglePoints[1],
    anglePoints[0]
  ]);

  let rotation2 = getAngle([
    point,
    anglePoints[1],
    anglePoints[2]
  ]);

  let rotation = Math.min(rotation1, rotation2);

  return rotation;
}
*/

function getKonvaLinePoints(anglePoints) {
  return [
    anglePoints[0].x, anglePoints[0].y,
    anglePoints[1].x, anglePoints[1].y,
    anglePoints[2].x, anglePoints[2].y    
  ];
}

export function Angle({
  anglePoints,
  setAnglePoints,
  stageWidth,
  stageHeight,
  gridIndent
}) {
  const [konvaLinePoints, setKonvaLinePoints] = useState(
    getKonvaLinePoints(anglePoints)
  );

  const [angle, setAngle] = useState(getAngle(anglePoints));
  // const [rotation, setRotation] = useState(getRotation(anglePoints, gridIndent));

  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let pointId = Number(event.target.id());

    let finalX = anglePoints[pointId].x;
    let finalY = anglePoints[pointId].y;

    if (dragEndX > 0 && dragEndX < stageWidth &&
        dragEndY > 0 && dragEndY < stageHeight
    ) {
      finalX = Math.round(dragEndX / gridIndent) * gridIndent;
      finalY = Math.round(dragEndY / gridIndent) * gridIndent;

      for (let i = 0; i < anglePoints.length; i++) {
        if (i === pointId) {
          continue;
        }

        if (finalX === anglePoints[i].x && finalY === anglePoints[i].y) {
          finalX = anglePoints[pointId].x;
          finalY = anglePoints[pointId].y;
          break;
        }
      }
    }

    event.target.x(finalX);
    event.target.y(finalY);

    let newAnglePoints = anglePoints.map((point) => {
      if (point.id === event.target.id()) {
        return {
          id: point.id,
          x: finalX,
          y: finalY
        }
      }

      return point;
    });

    setAnglePoints(newAnglePoints);
    setKonvaLinePoints(getKonvaLinePoints(newAnglePoints));
    setAngle(getAngle(newAnglePoints));
    // setRotation(getRotation(newAnglePoints, gridIndent));
  }

  function handleDragMove(event) {
    let x = event.target.x();
    let y = event.target.y();
    let pointId = Number(event.target.id());

    let updatedAnglePoints = JSON.parse(JSON.stringify(anglePoints));

    updatedAnglePoints[pointId].x = x;
    updatedAnglePoints[pointId].y = y;

    setKonvaLinePoints(getKonvaLinePoints(updatedAnglePoints));
    setAngle(getAngle(updatedAnglePoints));
    // setRotation(getRotation(updatedAnglePoints, gridIndent));
  }

  return (
    <>
      {anglePoints.map((point) => (
        <Circle
          id={point.id}
          key={point.id}
          x={point.x}
          y={point.y}
          radius={gridIndent / 4}
          fill={'black'}
          draggable
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      ))}
      <KonvaLine
        id={"0"}
        key={"0"}
        points={konvaLinePoints}
        stroke={'black'}
        strokeWidth={1}
      />
      <Text
        x={konvaLinePoints[2]}
        y={konvaLinePoints[3] - gridIndent}
        text={angle.toFixed(1)}
        fontSize={16}
      />
      <Text
        x={konvaLinePoints[0] - 0.75 * gridIndent}
        y={konvaLinePoints[1] - 0.5 * gridIndent}
        text={'A'}
        fontSize={16}
      />
      <Text
        x={konvaLinePoints[2] - 0.25 * gridIndent}
        y={konvaLinePoints[3] + 0.5 * gridIndent}
        text={'B'}
        fontSize={16}
      />
      <Text
        x={konvaLinePoints[4] - 0.75 * gridIndent}
        y={konvaLinePoints[5] - 0.5 * gridIndent}
        text={'C'}
        fontSize={16}
      />
    </>
  );
}

/*
  <Arc
    x={konvaLinePoints[2]}
    y={konvaLinePoints[3]}
    innerRadius={gridIndent / 4}
    outerRadius={gridIndent}
    angle={angle}
    fill={'blue'}
    opacity={0.25}
    stroke={'black'}
    strokeWidth={1}
  />
  <Arrow
    x={gridIndent}
    y={gridIndent}
    points={[0, 0, 4 * gridIndent, 0, 4 * gridIndent, 4 * gridIndent]}
    pointerLength={gridIndent}
    pointerWidth={gridIndent}
    fill={'black'}
    stroke={'black'}
    strokeWidth={1}
    tension={0.5}
  />
*/
