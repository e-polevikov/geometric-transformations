import { Circle, Text, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

import { getAngle } from '../../services/Geometry';

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

  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let pointId = Number(event.target.id());

    let finalX = anglePoints[pointId].x;
    let finalY = anglePoints[pointId].y;

    if (dragEndX >= 0 && dragEndX <= stageWidth &&
        dragEndY >= 0 && dragEndY <= stageHeight
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
  }

  function handleDragMove(event) {
    let x = event.target.x();
    let y = event.target.y();
    let pointId = Number(event.target.id());

    x = Math.round(x / gridIndent) * gridIndent;
    y = Math.round(y / gridIndent) * gridIndent;

    event.target.x(x);
    event.target.y(y);

    let updatedAnglePoints = JSON.parse(JSON.stringify(anglePoints));

    updatedAnglePoints[pointId].x = x;
    updatedAnglePoints[pointId].y = y;

    setKonvaLinePoints(getKonvaLinePoints(updatedAnglePoints));
    setAngle(getAngle(updatedAnglePoints));
  }

  return (
    <>
      <Text
        x={konvaLinePoints[2]}
        y={konvaLinePoints[3] - gridIndent}
        text={angle.toFixed(1) + '\u00B0'}
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
      <KonvaLine
        id={"0"}
        key={"0"}
        points={konvaLinePoints}
        stroke={'black'}
        strokeWidth={1}
      />
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
    </>
  );
}
