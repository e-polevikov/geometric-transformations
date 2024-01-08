import { Circle, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

function getKonvaLinePoints(line, stageWidth, stageHeight) {
  let x1 = line[0].x;
  let y1 = line[0].y;
  let x2 = line[1].x;
  let y2 = line[1].y;

  if (y2 === y1) {
    return [0, y1, stageWidth, y2];
  }

  let k = (x2 - x1) / (y2 - y1);
  
  return [
    (0 - y1) * k + x1, 0,
    (stageHeight - y1) * k + x1, stageHeight,
  ];
}

export function Line({ line, setLine, stageWidth, stageHeight, gridIndent }) {
  const [konvaLinePoints, setKonvaLinePoints] = useState(
    getKonvaLinePoints(line, stageWidth, stageHeight)
  );

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

    let newLine = line.map((point) => {
      if (point.id === event.target.id()) {
        return {
          id: point.id,
          x: finalX,
          y: finalY
        }
      }

      return point;
    });

    setLine(newLine);

    setKonvaLinePoints(
      getKonvaLinePoints(newLine, stageWidth, stageHeight)
    );
  }

  function handleDragMove(event) {
    let x = event.target.x();
    let y = event.target.y();
    let targetId = Number(event.target.id());

    let updatedLine = JSON.parse(JSON.stringify(line));

    updatedLine[targetId].x = x;
    updatedLine[targetId].y = y;

    setKonvaLinePoints(
      getKonvaLinePoints(updatedLine, stageWidth, stageHeight)
    );
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
