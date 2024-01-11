import { Line } from 'react-konva';

export function Figure({ points }) {
  return (
    <>
      <Line
        points={points}
        stroke={'black'}
        strokeWidth={2}
        closed={true}
      />
    </>
  );
}
