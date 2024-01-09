import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT
} from '../../constants/GeomStage';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [linePoints, setLinePoints] = useState([
    {
      id: "0",
      x: 3 * GRID_INDENT,
      y: 5 * GRID_INDENT
    },
    {
      id: "1",
      x: 7 * GRID_INDENT,
      y: 9 * GRID_INDENT      
    }
  ]);

  const [anglePoints, setAnglePoints] = useState([
    {
      id: "0",
      x: 13 * GRID_INDENT,
      y: 15 * GRID_INDENT
    },
    {
      id: "1",
      x: 7 * GRID_INDENT,
      y: 18 * GRID_INDENT      
    },
    {
      id: "2",
      x: 9 * GRID_INDENT,
      y: 22 * GRID_INDENT      
    }
  ]);

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['transformations-panel']}>
        <h2 style={{textAlign: "center"}}>Преобразования</h2>
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Line
              linePoints={linePoints}
              setLinePoints={setLinePoints}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Angle
              anglePoints={anglePoints}
              setAnglePoints={setAnglePoints}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
