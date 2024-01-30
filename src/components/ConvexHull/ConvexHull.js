import { Line } from 'react-konva';
import { getConvexHull } from '../../services/GeomMetrics';

export function ConvexHull({ figures }) {
  const convexHull = getConvexHull(figures);

  return (
    <>
      <Line
        points={convexHull}
        stroke={'black'}
        dash={[4, 2]}
        strokeWidth={2.5}
      />      
    </>
  );
};
