import { Line } from 'react-konva';

export function TargetFigure({ points }) {
  return (
    <>
      <Line
        points={points}
        stroke={'black'}
        fill={'red'}
        opacity={0.25}
        strokeWidth={1.5}
        closed={true}
      />
    </>
  );
}
