import { ACTIONS } from "../constants/Action";
import { TRANSFORMATIONS } from "../constants/Transformations";

import { reflectPoints, rotatePoints } from "../services/Geometry";

export function figureReducer(figure, action) {
  let updatedFigure = JSON.parse(JSON.stringify(figure));

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

  // Handling ACTIONS.APPLY

  if (updatedFigure.currentStateIdx !== updatedFigure.points.length - 1) {
    updatedFigure.points = updatedFigure.points.slice(
      0, updatedFigure.currentStateIdx + 1
    );
  }

  if (action.transformation === TRANSFORMATIONS.REFLECT) {
    let reflectedPoints = reflectPoints(
      updatedFigure.points[updatedFigure.currentStateIdx],
      action.linePoints
    );

    updatedFigure.points.push(reflectedPoints);
    updatedFigure.currentStateIdx += 1;

    return updatedFigure;
  }

  let clockwise = (action.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  let rotatedPoints = rotatePoints(
    updatedFigure.points[updatedFigure.currentStateIdx],
    action.anglePoints,
    clockwise
  );

  updatedFigure.points.push(rotatedPoints);
  updatedFigure.currentStateIdx += 1;

  return updatedFigure;
}
