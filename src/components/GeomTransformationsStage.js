import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/GeomTransformationsStage';

import styles from './GeomTransformationsStage.module.css';

export function GeomTransformationsStage() {
  return (
    <div className={styles['geom-transformations-stage']}>
      <div className={styles['transformations-panel']}>
        <h2 style={{textAlign: "center"}}>Преобразования</h2>
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer></Layer>
        </Stage>
      </div>
    </div>
  );
}
