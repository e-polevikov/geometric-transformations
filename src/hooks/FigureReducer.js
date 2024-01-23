import { ACTIONS } from "../constants/Action";
import { TRANSFORMATIONS } from "../constants/Transformations";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants/GeomStage";

import {
  reflectPoints,
  rotatePoints,
  figureIsOutOfStageBoundaries
} from "../services/GeomTransformations";

export function figureReducer(figure, action) {
  let updatedFigure = JSON.parse(JSON.stringify(figure));

  if (updatedFigure.id !== action.states.selectedFigureId) {
    return updatedFigure;
  }

  if (action.type === ACTIONS.UNDO) {
    if (updatedFigure.stateIdx > 0) {
      updatedFigure.stateIdx -= 1;
    }

    return updatedFigure;
  }

  if (action.type === ACTIONS.REDO) {
    if (updatedFigure.stateIdx < updatedFigure.points.length - 1) {
      updatedFigure.stateIdx += 1;
    }

    return updatedFigure;
  }

  if (action.type !== ACTIONS.APPLY) {
    return updatedFigure;
  }

  if (action.states.transformation === TRANSFORMATIONS.REFLECT) {
    let reflectedPoints = reflectPoints(
      updatedFigure.points[updatedFigure.stateIdx],
      action.states.linePoints
    );

    if (figureIsOutOfStageBoundaries(
      reflectedPoints, STAGE_WIDTH, STAGE_HEIGHT
    )) {
      return updatedFigure;
    }

    updatedFigure.points = updatedFigure.points.slice(
      0, updatedFigure.stateIdx + 1
    );

    updatedFigure.points.push(reflectedPoints);
    updatedFigure.stateIdx += 1;

    return updatedFigure;
  }

  let clockwise = (action.states.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  let rotatedPoints = rotatePoints(
    updatedFigure.points[updatedFigure.stateIdx],
    action.states.anglePoints,
    clockwise
  );

  if (figureIsOutOfStageBoundaries(
    rotatedPoints, STAGE_WIDTH, STAGE_HEIGHT
  )) {
    return updatedFigure;
  }

  updatedFigure.points = updatedFigure.points.slice(
    0, updatedFigure.stateIdx + 1
  );

  updatedFigure.points.push(rotatedPoints);
  updatedFigure.stateIdx += 1;

  return updatedFigure;
}
