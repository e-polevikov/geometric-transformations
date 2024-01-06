import { Circle, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

export function Angle({ angle, setAngle, stageWidth, stageHeight, gridIndent }) {
  const [konvaLinePoints, setKonvaLinePoints] = useState([
    angle[0].x, angle[0].y,
    angle[1].x, angle[1].y,
    angle[2].x, angle[2].y
  ]);

  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let pointId = Number(event.target.id());

    let finalX = angle[pointId].x;
    let finalY = angle[pointId].y;

    if (dragEndX > 0 && dragEndX < stageWidth &&
        dragEndY > 0 && dragEndY < stageHeight
    ) {
      finalX = Math.round(dragEndX / gridIndent) * gridIndent;
      finalY = Math.round(dragEndY / gridIndent) * gridIndent;

      for (let i = 0; i < angle.length; i++) {
        if (i === pointId) {
          continue;
        }

        if (finalX === angle[i].x && finalY === angle[i].y) {
          finalX = angle[pointId].x;
          finalY = angle[pointId].y;
          break;
        }
      }
    }

    event.target.x(finalX);
    event.target.y(finalY);

    setAngle(angle.map((point) => {
      if (point.id === event.target.id()) {
        return {
          id: point.id,
          x: finalX,
          y: finalY
        }
      }

      return point;
    }));

    let newKonvaLinePoints = JSON.parse(JSON.stringify(konvaLinePoints));

    newKonvaLinePoints[2 * pointId] = finalX;
    newKonvaLinePoints[2 * pointId + 1] = finalY;

    setKonvaLinePoints(newKonvaLinePoints);
  }

  function handleDragMove(event) {
    let x = event.target.x();
    let y = event.target.y();
    let targetId = Number(event.target.id());

    let newKonvaLinePoints = JSON.parse(JSON.stringify(konvaLinePoints));

    newKonvaLinePoints[2 * targetId] = x;
    newKonvaLinePoints[2 * targetId + 1] = y;

    setKonvaLinePoints(newKonvaLinePoints);
  }

  return (
    <>
      {angle.map((point) => (
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
    </>
  );
}
