import { useState, useReducer } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT
} from '../../constants/GeomStage';

import { TRANSFORMATIONS } from '../../constants/Transformations';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';
import { Transformations } from '../Transformations/Transformations';
import { ActionControl } from '../ActionControl/ActionControl';
import { Figure } from '../Figure/Figure';

import { figureReducer } from '../../hooks/FigureReducer';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [linePoints, setLinePoints] = useState([
    {
      id: "0",
      x: 20 * GRID_INDENT,
      y: 15 * GRID_INDENT
    },
    {
      id: "1",
      x: 25 * GRID_INDENT,
      y: 20 * GRID_INDENT      
    }
  ]);

  const [anglePoints, setAnglePoints] = useState([
    {
      id: "0",
      x: 15 * GRID_INDENT,
      y: 5 * GRID_INDENT
    },
    {
      id: "1",
      x: 20 * GRID_INDENT,
      y: 3 * GRID_INDENT      
    },
    {
      id: "2",
      x: 22 * GRID_INDENT,
      y: 8 * GRID_INDENT      
    }
  ]);

  const [figureState, dispatch] = useReducer(figureReducer, {
    points: [[
      GRID_INDENT, 29 * GRID_INDENT,
      6 * GRID_INDENT, 29 * GRID_INDENT,
      GRID_INDENT, 26 * GRID_INDENT
    ]],
    currentStateIdx: 0
  });

  const [transformation, setTransformation] = useState(TRANSFORMATIONS.ROTATE_CLOCKWISE);

  function handleAction(action) {
    dispatch({type: action, transformation: transformation});
  }

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['transformations-panel']}>
        <h2 style={{textAlign: "center"}}>Преобразования</h2>
        <Transformations
          transformation={transformation}
          setTransformation={setTransformation}
        />
        <ActionControl handleAction={handleAction}/>
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
            <Figure
              points={figureState.points[figureState.currentStateIdx]}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
