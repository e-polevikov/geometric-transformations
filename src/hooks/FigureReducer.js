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
    if (updatedFigure.currentStateIdx > 0) {
      updatedFigure.currentStateIdx -= 1;
    }

    return updatedFigure;
  }

  if (action.type === ACTIONS.REDO) {
    if (updatedFigure.currentStateIdx < updatedFigure.points.length - 1) {
      updatedFigure.currentStateIdx += 1;
    }

    return updatedFigure;
  }

  if (action.type !== ACTIONS.APPLY) {
    return updatedFigure;
  }

  if (action.states.transformation === TRANSFORMATIONS.REFLECT) {
    let reflectedPoints = reflectPoints(
      updatedFigure.points[updatedFigure.currentStateIdx],
      action.states.linePoints
    );

    if (figureIsOutOfStageBoundaries(
      reflectedPoints, STAGE_WIDTH, STAGE_HEIGHT
    )) {
      return updatedFigure;
    }

    updatedFigure.points = updatedFigure.points.slice(
      0, updatedFigure.currentStateIdx + 1
    );

    updatedFigure.points.push(reflectedPoints);
    updatedFigure.currentStateIdx += 1;

    return updatedFigure;
  }

  let clockwise = (action.states.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  let rotatedPoints = rotatePoints(
    updatedFigure.points[updatedFigure.currentStateIdx],
    action.states.anglePoints,
    clockwise
  );

  if (figureIsOutOfStageBoundaries(
    rotatedPoints, STAGE_WIDTH, STAGE_HEIGHT
  )) {
    return updatedFigure;
  }

  updatedFigure.points = updatedFigure.points.slice(
    0, updatedFigure.currentStateIdx + 1
  );

  updatedFigure.points.push(rotatedPoints);
  updatedFigure.currentStateIdx += 1;

  return updatedFigure;
}
