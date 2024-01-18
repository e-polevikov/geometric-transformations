import { Line } from 'react-konva';

export function TargetFigure({ points }) {
  return (
    <>
      <Line
        points={points}
        stroke={'green'}
        strokeWidth={1.5}
        closed={true}
      />
    </>
  );
}
