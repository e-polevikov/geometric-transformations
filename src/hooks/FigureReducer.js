import { ACTIONS } from "../constants/Action";
import { TRANSFORMATIONS } from "../constants/Transformations";

import { GRID_INDENT } from "../constants/GeomStage";

function reflectPoints(points, linePoints) {
  let reflectedPoints = JSON.parse(JSON.stringify(points));

  for (let i = 0; i < reflectedPoints.length; i += 2) {
    reflectedPoints[i] += GRID_INDENT;
  }

  return reflectedPoints;
}

function rotatePoints(points, point, angle) {
  let rotatedPoints = JSON.parse(JSON.stringify(points));
  return rotatedPoints;
}

export function figureReducer(figureState, action) {
  let updatedFigureState = JSON.parse(JSON.stringify(figureState));

  if (action.type === ACTIONS.UNDO) {
    if (updatedFigureState.currentStateIdx > 0) {
      updatedFigureState.currentStateIdx -= 1;
    }

    return updatedFigureState;
  }

  if (action.type === ACTIONS.REDO) {
    if (updatedFigureState.currentStateIdx < updatedFigureState.points.length - 1) {
      updatedFigureState.currentStateIdx += 1;
    }

    return updatedFigureState;
  }

  // Handling ACTIONS.APPLY

  if (action.transformation === TRANSFORMATIONS.REFLECT) {
    let reflectedPoints = reflectPoints(
      updatedFigureState.points[updatedFigureState.currentStateIdx],
      action.linePoints
    );

    updatedFigureState.points.push(reflectedPoints);
    updatedFigureState.currentStateIdx += 1;

    return updatedFigureState;
  }

  if (action.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE) {
    return updatedFigureState;
  } else { // Rotate counter clockwise
    return updatedFigureState;
  }
}
