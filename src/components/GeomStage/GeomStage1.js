import { useState, useReducer } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT,
  LINE_POINTS,
  FIGURE1, FIGURE2
} from '../../constants/GeomStage1';

import { TRANSFORMATIONS } from '../../constants/Transformations';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Transformations1 } from '../Transformations/Transformations1';
import { ActionControl } from '../ActionControl/ActionControl';
import { Figure } from '../Figure/Figure';
import { FigureImage } from '../Figure/FigureImage';
import { MetricsDisplay } from '../MetricsDisplay/MetricsDisplay';

import { figureReducer } from '../../hooks/FigureReducer';
import { figureImageReducer } from '../../hooks/FigureImageReducer';

import { reflectPoints } from '../../services/GeomTransformations';

import styles from './GeomStage.module.css';

export function GeomStage1() {
  const [linePoints, setLinePoints] = useState(LINE_POINTS);
  const [transformation, setTransformation] = useState(TRANSFORMATIONS.REFLECT);
  const [selectedFigureId, setSelectedFigureId] = useState(1);

  const [metrics, setMetrics] = useState({
    intersectionRatio: 0,
    pathLength: 0,
    numTransformations: 0
  });

  const [figure1, figureDispatch1] = useReducer(figureReducer, {
    id: 1, points: [FIGURE1.POINTS], stateIdx: 0
  });

  const [figure2, figureDispatch2] = useReducer(figureReducer, {
    id: 2, points: [FIGURE2.POINTS], stateIdx: 0
  });

  const [figureImage, figureImageDispatch] = useReducer(figureImageReducer, {
    points: reflectPoints(FIGURE1.POINTS, linePoints)
  });

  function handleAction(type, states) {
    let action = {
      type: type,
      states: {
        figures: [figure1, figure2],
        selectedFigureId: selectedFigureId,
        transformation: transformation,
        linePoints: linePoints
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

    figureDispatch1(action);
    figureDispatch2(action);
    figureImageDispatch(action);
  }

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['panel']}>
        <Transformations1
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
              figureId={1}
              selectedFigureId={selectedFigureId}
              setSelectedFigureId={setSelectedFigureId}
              points={figure1.points.slice(0, figure1.stateIdx + 1)}
              gridIndent={GRID_INDENT}
              fillColor={'blue'}
              handleClick={handleAction}
            />
            <Figure
              figureId={2}
              selectedFigureId={selectedFigureId}
              setSelectedFigureId={setSelectedFigureId}
              points={figure2.points.slice(0, figure2.stateIdx + 1)}
              gridIndent={GRID_INDENT}
              fillColor={'red'}
              handleClick={handleAction}
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
