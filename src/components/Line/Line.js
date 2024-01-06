import { Circle } from 'react-konva';

export function Line({ line, setLine, stageWidth, stageHeight, gridIndent }) {
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

      if (finalX == line[sndPointId].x && finalY == line[sndPointId].y) {
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
          onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
}
