import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT
} from '../../constants/GeomTransformationsStage';

import { StageGrid } from '../StageGrid/StageGrid';

import styles from './GeomTransformationsStage.module.css';

export function GeomTransformationsStage() {
  return (
    <div className={styles['geom-transformations-stage']}>
      <div className={styles['transformations-panel']}>
        <h2 style={{textAlign: "center"}}>Преобразования</h2>
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              indent={GRID_INDENT}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
