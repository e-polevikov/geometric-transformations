import { ACTIONS } from "../constants/Action";
import { TRANSFORMATIONS } from "../constants/Transformations";

function reflectPoint(point, linePoints) {
  let x1 = linePoints[0].x;
  let y1 = linePoints[0].y;
  let x2 = linePoints[1].x;
  let y2 = linePoints[1].y;
  
  let k1 = (y2 - y1) / (x2 - x1);
  let b1 = y1 - k1 * x1;
  
  // Coefficients of perpendicular line
  let k2 = -1 / k1;
  let b2 = point.y - k2 * point.x;

  // Coordinates of lines intersection (initial and perpendicular)
  let x = (b2 - b1) / (k1 - k2);
  let y = k1 * x + b1;

  // Coordinates of reflected point
  let xReflected = point.x + 2 * (x - point.x);
  let yReflected = point.y + 2 * (y - point.y);

  return [xReflected, yReflected];
}

function reflectPoints(points, linePoints) {
  let reflectedPoints = JSON.parse(JSON.stringify(points));

  let x1 = linePoints[0].x;
  let y1 = linePoints[0].y;
  let x2 = linePoints[1].x;
  let y2 = linePoints[1].y;

  if (x1 === x2) {
    for (let i = 0; i < reflectedPoints.length; i += 2) {
      reflectedPoints[i] += 2 * (x1 - reflectedPoints[i]);
    }

    return reflectedPoints;
  }

  if (y1 === y2) {
    for (let i = 1; i < reflectedPoints.length; i += 2) {
      reflectedPoints[i] += 2 * (y1 - reflectedPoints[i]);
    }

    return reflectedPoints;
  }

  for (let i = 0; i < reflectedPoints.length; i += 2) {
    let [xReflected, yReflected] = reflectPoint(
      {x: reflectedPoints[i], y: reflectedPoints[i + 1]},
      linePoints
    );

    reflectedPoints[i] = xReflected;
    reflectedPoints[i + 1] = yReflected;
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

  if (updatedFigureState.currentStateIdx !== updatedFigureState.points.length - 1) {
    updatedFigureState.points = updatedFigureState.points.slice(
      0, updatedFigureState.currentStateIdx + 1
    );
  }

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
