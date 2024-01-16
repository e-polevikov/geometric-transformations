import { TRANSFORMATIONS } from "../constants/Transformations";

import { reflectPoints, rotatePoints } from "../services/Geometry";

export function figureImageReducer(figureImage, action) {
  if (action.transformation === TRANSFORMATIONS.REFLECT) {
    return {points: reflectPoints(action.figurePoints, action.linePoints)};
  }

  let clockwise = (action.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  return {points: rotatePoints(action.figurePoints, action.anglePoints, clockwise)};
}
