import { useState, useReducer, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT,
  LINE_POINTS,
  ANGLE_POINTS,
  FIGURE1, FIGURE2, FIGURE3,
} from '../../constants/GeomStage2';

import { TRANSFORMATIONS } from '../../constants/Transformations';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';
import { ActionControl } from '../ActionControl/ActionControl';
import { Transformations } from '../Transformations/Transformations';
import { Figure } from '../Figure/Figure';
import { FigureImage } from '../Figure/FigureImage';
import { MetricsDisplay } from '../MetricsDisplay/MetricsDisplay';

import { figureReducer } from '../../hooks/FigureReducer';
import { figureImageReducer } from '../../hooks/FigureImageReducer';

import { reflectPoints } from '../../services/GeomTransformations';
import { calcMetrics } from '../../services/GeomMetrics';

import styles from './GeomStage.module.css';

export function GeomStage2() {
  const [linePoints, setLinePoints] = useState(LINE_POINTS);
  const [anglePoints, setAnglePoints] = useState(ANGLE_POINTS);
  const [selectedFigureId, setSelectedFigureId] = useState(1);
  const [transformation, setTransformation] = useState(TRANSFORMATIONS.REFLECT);

  const [metrics, setMetrics] = useState({
    intersectionRatio: 0,
    pathLength: 0,
    numTransformations: 0
  });

  const [figure1, figure1Dispatch] = useReducer(figureReducer, {
    id: FIGURE1.ID,
    points: [FIGURE1.POINTS],
    bounds: [FIGURE1.TARGET_BOUNDS],
    stateIdx: 0
  });

  const [figure2, figure2Dispatch] = useReducer(figureReducer, {
    id: FIGURE2.ID,
    points: [FIGURE2.POINTS],
    bounds: [FIGURE2.TARGET_BOUNDS],
    stateIdx: 0
  });

  const [figure3, figure3Dispatch] = useReducer(figureReducer, {
    id: FIGURE3.ID,
    points: [FIGURE3.POINTS],
    bounds: [FIGURE3.TARGET_BOUNDS],
    stateIdx: 0
  });

  const [figureImage, figureImageDispatch] = useReducer(figureImageReducer, {
    points: reflectPoints(FIGURE1.POINTS, linePoints)
  });

  function handleAction(type, states) {
    let action = {
      type: type,
      states: {
        figures: [figure1, figure2, figure3],
        selectedFigureId: selectedFigureId,
        transformation: transformation,
        linePoints: linePoints,
        anglePoints: anglePoints
      }
    };

    if (states.transformation) {
      action.states.transformation = states.transformation;
    }

    if (states.linePoints) {
      action.states.linePoints = states.linePoints;
    }

    if (states.selectedFigureId) {
      action.states.selectedFigureId = states.selectedFigureId;
    }

    if (states.anglePoints) {
      action.states.anglePoints = states.anglePoints;
    }

    figure1Dispatch(action);
    figure2Dispatch(action);
    figure3Dispatch(action);
    figureImageDispatch(action);
  }

  useEffect(() => {
    setMetrics(calcMetrics([figure1, figure2, figure3], GRID_INDENT));
  }, [figure1.stateIdx, figure2.stateIdx, figure3.stateIdx]);

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['panel']}>
        <Transformations
          transformation={transformation}
          setTransformation={setTransformation}
          handleChange={handleAction}
        />
        <ActionControl
          handleClick={handleAction}
        />
        <MetricsDisplay
          metrics={metrics}
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
            <FigureImage
              points={figureImage.points}
            />
            <Figure
              figureId={FIGURE1.ID}
              selectedFigureId={selectedFigureId}
              setSelectedFigureId={setSelectedFigureId}
              points={figure1.points.slice(0, figure1.stateIdx + 1)}
              gridIndent={GRID_INDENT}
              fillColor={'blue'}
              handleClick={handleAction}
            />
            <Figure
              figureId={FIGURE2.ID}
              selectedFigureId={selectedFigureId}
              setSelectedFigureId={setSelectedFigureId}
              points={figure2.points.slice(0, figure2.stateIdx + 1)}
              gridIndent={GRID_INDENT}
              fillColor={'red'}
              handleClick={handleAction}
            />
            <Figure
              figureId={FIGURE3.ID}
              selectedFigureId={selectedFigureId}
              setSelectedFigureId={setSelectedFigureId}
              points={figure3.points.slice(0, figure3.stateIdx + 1)}
              gridIndent={GRID_INDENT}
              fillColor={'green'}
              handleClick={handleAction}
            />
            <Angle
              anglePoints={anglePoints}
              setAnglePoints={setAnglePoints}
              isSelected={transformation !== TRANSFORMATIONS.REFLECT}
              handlePointMove={handleAction}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Line
              linePoints={linePoints}
              setLinePoints={setLinePoints}
              isSelected={transformation === TRANSFORMATIONS.REFLECT}
              handlePointMove={handleAction}
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
