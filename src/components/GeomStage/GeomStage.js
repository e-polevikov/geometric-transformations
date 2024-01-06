import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT
} from '../../constants/GeomStage';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [line, setLine] = useState([
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
              line={line}
              setLine={setLine}
              gridIndent={GRID_INDENT}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
