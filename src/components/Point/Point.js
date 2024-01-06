import { Circle } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT } from '../../constants/GeomStage';

export function Point({ gridIndent }) {
  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let finalX = 0;
    let finalY = 0;

    if (dragEndX > 0 && dragEndX < STAGE_WIDTH &&
        dragEndY > 0 && dragEndY < STAGE_HEIGHT
    ) {
      finalX = Math.round(dragEndX / gridIndent) * gridIndent;
      finalY = Math.round(dragEndY / gridIndent) * gridIndent;
    }

    event.target.x(finalX);
    event.target.y(finalY);
  }

  return (
    <>
      <Circle
        x={0}
        y={0}
        radius={gridIndent / 4}
        fill={'black'}
        draggable
        onDragEnd={handleDragEnd}
      />
    </>
  );
}
