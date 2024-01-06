import { Circle, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

export function Line({ line, setLine, stageWidth, stageHeight, gridIndent }) {
  const [konvaLinePoints, setKonvaLinePoints] = useState([
    line[0].x, line[0].y, line[1].x, line[1].y
  ]);

  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let pointId = Number(event.target.id());

    let finalX = line[pointId].x;
    let finalY = line[pointId].y;

    if (dragEndX > 0 && dragEndX < stageWidth &&
        dragEndY > 0 && dragEndY < stageHeight
    ) {
      finalX = Math.round(dragEndX / gridIndent) * gridIndent;
      finalY = Math.round(dragEndY / gridIndent) * gridIndent;

      let sndPointId = (pointId + 1) % 2;

      if (finalX === line[sndPointId].x && finalY === line[sndPointId].y) {
        finalX = line[pointId].x;
        finalY = line[pointId].y;
      }
    }

    event.target.x(finalX);
    event.target.y(finalY);

    setLine(line.map((point) => {
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
      {line.map((point) => (
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
