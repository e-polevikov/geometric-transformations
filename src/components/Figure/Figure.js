import { Line, Circle } from 'react-konva';

import { getCentroidCoordinates } from '../../services/Geometry';

export function Figure({ figurePoints, gridIndent }) {
  let centroids = figurePoints.flatMap((points) => {
    return getCentroidCoordinates(points);
  });

  return (
    <>
      <Line
        points={figurePoints[figurePoints.length - 1]}
        stroke={'black'}
        strokeWidth={2}
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
