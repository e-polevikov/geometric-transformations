import { useState, useReducer } from 'react';
import { Stage, Layer, Line as KonvaLine } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT,
  LINE_POINTS,
  ANGLE_POINTS,
  FIGURE_POINTS,
  TARGET_FIGURE_POINTS
} from '../../constants/GeomStage';

import { TRANSFORMATIONS } from '../../constants/Transformations';
import { ACTIONS } from '../../constants/Action';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';
import { Transformations } from '../Transformations/Transformations';
import { ActionControl } from '../ActionControl/ActionControl';
import { Figure } from '../Figure/Figure';
import { FigureImage } from '../Figure/FigureImage';
import { ResultDisplay } from '../ResultDisplay/ResultDisplay';

import { figureReducer } from '../../hooks/FigureReducer';
import { figureImageReducer } from '../../hooks/FigureImageReducer';

import {
  reflectPoints,
  getSumOfDistances,
  getPathLength
} from '../../services/Geometry';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [linePoints, setLinePoints] = useState(LINE_POINTS);
  const [anglePoints, setAnglePoints] = useState(ANGLE_POINTS);
  const [transformation, setTransformation] = useState(TRANSFORMATIONS.REFLECT);

  const [figure, figureDispatch] = useReducer(figureReducer, {
    points: [FIGURE_POINTS], currentStateIdx: 0
  });

  const [figureImage, figureImageDispatch] = useReducer(figureImageReducer, {
    points: reflectPoints(FIGURE_POINTS, linePoints)
  });

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

  function handleActionApply(action) {
    figureDispatch({
      type: action,
      transformation: transformation,
      linePoints: linePoints,
      anglePoints: anglePoints
    });

    let figurePoints;

    if (action === ACTIONS.APPLY) {
      figurePoints = figureImage.points;
    }

    if (action === ACTIONS.UNDO) {
      if (figure.currentStateIdx === 0) {
        return;
      }

      figurePoints = figure.points[figure.currentStateIdx - 1];
    }

    if (action === ACTIONS.REDO) {
      if (figure.currentStateIdx === figure.points.length - 1) {
        return;
      }

      figurePoints = figure.points[figure.currentStateIdx + 1];
    }

    figureImageDispatch({
      figurePoints: figurePoints,
      transformation: transformation,
      linePoints: linePoints,
      anglePoints: anglePoints
    });
  }

  function handleLinePointChange(currentLinePoints) {
    if (transformation === TRANSFORMATIONS.REFLECT) {
      figureImageDispatch({
        figurePoints: figure.points[figure.currentStateIdx],
        transformation: transformation,
        linePoints: currentLinePoints
      });
    }
  }

  function handleAnglePointChange(currentAnglePoints) {
    if (transformation !== TRANSFORMATIONS.REFLECT) {
      figureImageDispatch({
        figurePoints: figure.points[figure.currentStateIdx],
        transformation: transformation,
        anglePoints: currentAnglePoints
      });
    }   
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
          onClick={handleActionApply}
        />
        <ResultDisplay
          sumOfDistances={getSumOfDistances(
            figure.points[figure.currentStateIdx],
            TARGET_FIGURE_POINTS, GRID_INDENT)
          }
          pathLength={getPathLength(
            figure.points.slice(0, figure.currentStateIdx + 1),
            GRID_INDENT)
          }
          numTransformations={figure.currentStateIdx}
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
            <KonvaLine
              points={TARGET_FIGURE_POINTS}
              stroke={'green'}
              strokeWidth={1}
              closed={true}
            />
            <FigureImage
              points={figureImage.points}
            />
            <Figure
              figurePoints={figure.points.slice(0, figure.currentStateIdx + 1)}
              gridIndent={GRID_INDENT}
            />
            <Angle
              anglePoints={anglePoints}
              setAnglePoints={setAnglePoints}
              onPointChange={handleAnglePointChange}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Line
              linePoints={linePoints}
              setLinePoints={setLinePoints}
              onPointChange={handleLinePointChange}
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
