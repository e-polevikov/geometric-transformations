import { useState, useReducer } from 'react';
import { Stage, Layer, Line as KonvaLine } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT,
  LINE_POINTS,
  ANGLE_POINTS,
  FIGURE_POINTS
} from '../../constants/GeomStage';

import { TRANSFORMATIONS } from '../../constants/Transformations';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';
import { Transformations } from '../Transformations/Transformations';
import { ActionControl } from '../ActionControl/ActionControl';
import { Figure } from '../Figure/Figure';
import { FigureImage } from '../Figure/FigureImage';

import { figureReducer } from '../../hooks/FigureReducer';
import { figureImageReducer } from '../../hooks/FigureImageReducer';

import { reflectPoints } from '../../services/Geometry';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [linePoints, setLinePoints] = useState(LINE_POINTS);
  const [anglePoints, setAnglePoints] = useState(ANGLE_POINTS);
  const [transformation, setTransformation] = useState(TRANSFORMATIONS.REFLECT);

  const [figure, figureDispatch] = useReducer(figureReducer, {
    points: [FIGURE_POINTS], currentStateIdx: 0
  });

  const [figureImage, figureImageDispatch] = useReducer(
    figureImageReducer,
    reflectPoints(FIGURE_POINTS, linePoints)
  );

  function handleTransformationChange(event) {
    let newTransformation = event.target.value;
    setTransformation(newTransformation);
    figureImageDispatch({
      figurePoints: figure.points[figure.currentStateIdx],
      transformation: newTransformation,
      linePoints: linePoints,
      anglePoints: anglePoints
    });
  }

  function handleActionApplying(action) {
    figureDispatch({
      type: action,
      transformation: transformation,
      linePoints: linePoints,
      anglePoints: anglePoints
    });
  }

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['transformations-panel']}>
        <h2 style={{textAlign: "center"}}>Преобразования</h2>
        <Transformations
          transformation={transformation}
          onChange={handleTransformationChange}
        />
        <ActionControl
          onClick={handleActionApplying}
        />
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Figure
              points={figure.points[figure.currentStateIdx]}
            />
            <FigureImage
              points={figureImage}
            />
            <KonvaLine
              points={[
                STAGE_WIDTH - 10 * GRID_INDENT, 5 * GRID_INDENT,
                STAGE_WIDTH - 5 * GRID_INDENT, 5 * GRID_INDENT,
                STAGE_WIDTH - 10 * GRID_INDENT, 2 * GRID_INDENT,
              ]}
              stroke={'green'}
              strokeWidth={2}
              closed={true}
            />
            <Angle
              anglePoints={anglePoints}
              setAnglePoints={setAnglePoints}
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
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
