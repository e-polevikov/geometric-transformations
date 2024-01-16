import { TRANSFORMATIONS } from "../constants/Transformations";

import { reflectPoints, rotatePoints } from "../services/Geometry";

export function figureImageReducer(figureImage, action) {
  if (action.transformation === TRANSFORMATIONS.REFLECT) {
    return reflectPoints(action.figurePoints, action.linePoints);
  }

  let clockwise = (action.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  return rotatePoints(action.figurePoints, action.anglePoints, clockwise);
}
