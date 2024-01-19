import { Line, Circle } from 'react-konva';

import { getCentroidCoordinates } from '../../services/Geometry';

export function Figure({ points, gridIndent }) {
  let centroids = points.flatMap((pts) => {
    return getCentroidCoordinates(pts);
  });

  return (
    <>
      <Line
        points={points[points.length - 1]}
        stroke={'black'}
        fill={'blue'}
        opacity={0.25}
        strokeWidth={1.5}
        closed={true}
      />
      <Line
        points={centroids}
        stroke={'black'}
        dash={[4, 2]}
        strokeWidth={0.5}
      />
      <Circle
        x={centroids[0]}
        y={centroids[1]}
        radius={gridIndent / 8}
        fill={'black'}
      />
      <Circle
        x={centroids[centroids.length - 2]}
        y={centroids[centroids.length - 1]}
        radius={gridIndent / 8}
        fill={'black'}
      />
    </>
  );
}
