import { Circle } from 'react-konva';

export function Point({ gridIndent }) {
  const x = 3 * gridIndent;
  const y = 5 * gridIndent;

  return (
    <>
      <Circle
        x={x}
        y={y}
        radius={gridIndent / 4}
        fill={'black'}
        draggable
        onDragEnd={(event) => {
          let dragEndX = event.target.x();
          let dragEndY = event.target.y();

          event.target.x(Math.round(dragEndX / gridIndent) * gridIndent);
          event.target.y(Math.round(dragEndY / gridIndent) * gridIndent);
        }}
      />
    </>
  );
}
