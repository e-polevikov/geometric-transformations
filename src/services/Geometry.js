
export function getCentroidCoordinates(trianglePoints) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < trianglePoints.length / 2; i++) {
    x += trianglePoints[2 * i];
    y += trianglePoints[2 * i + 1];
  }

  return [x / 3, y / 3];
}

export function getSumOfDistances(figure1Points, figure2Points, gridIndent) {
  let numPoints = figure1Points.length / 2;
  let sumOfDistances = 0;

  for (let i = 0; i < numPoints; i++) {
    let x1 = figure1Points[2 * i];
    let y1 = figure1Points[2 * i + 1];
    let x2 = figure2Points[2 * i];
    let y2 = figure2Points[2 * i + 1];

    sumOfDistances += Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  }

  sumOfDistances /= Math.pow(gridIndent, 2);

  return sumOfDistances.toFixed(3);
}

export function getAngle(anglePoints) {
  let point1 = anglePoints[0];
  let point2 = anglePoints[1];
  let point3 = anglePoints[2];

  let vector1 = {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };

  let vector2 = {
    x: point3.x - point2.x,
    y: point3.y - point2.y
  };

  let dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  let length1 = Math.sqrt(Math.pow(vector1.x, 2) + Math.pow(vector1.y, 2));
  let length2 = Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2));

  let angle = Math.acos(dotProduct / length1 / length2);

  return angle * 180 / Math.PI;
}

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

export function reflectPoints(points, linePoints) {
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

export function rotatePoints(points, anglePoints, clockwise) {
  let rotatedPoints = JSON.parse(JSON.stringify(points));
  let angle = getAngle(anglePoints);

  angle *= Math.PI / 180;

  if (!clockwise) {
    angle *= -1;
  }

  for (let i = 0; i < rotatedPoints.length; i += 2) {
    let x = rotatedPoints[i] - anglePoints[1].x;
    let y = rotatedPoints[i + 1] - anglePoints[1].y;

    let xRotated = x * Math.cos(angle) - y * Math.sin(angle) + anglePoints[1].x;
    let yRotated = x * Math.sin(angle) + y * Math.cos(angle) + anglePoints[1].y; 

    rotatedPoints[i] = xRotated;
    rotatedPoints[i + 1] = yRotated;
  }

  return rotatedPoints;
}
