import { Line, Circle } from 'react-konva';

export function Figure({ points, centroid, gridIndent }) {
  return (
    <>
      <Line
        points={points}
        stroke={'black'}
        strokeWidth={2}
        closed={true}
      />
      <Circle
        x={centroid.x}
        y={centroid.y}
        radius={gridIndent / 8}
        fill={'black'}
      />
    </>
  );
}
