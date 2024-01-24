import * as PolyBool from 'polybooljs';
import * as geometric from 'geometric'

export function getPathLength(figurePoints, gridIndent) {
  let centroids = figurePoints.map((points) => {
    return getCentroidCoordinates(points);
  });

  let pathLength = 0;

  for (let i = 0; i < centroids.length - 1; i++) {
    let [x1, y1] = centroids[i];
    let [x2, y2] = centroids[i + 1];

    pathLength += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  pathLength /= gridIndent;

  return pathLength;
}

export function getCentroidCoordinates(points) {
  let x = 0;
  let y = 0;
  let numPoints = points.length / 2;

  for (let i = 0; i < numPoints; i++) {
    x += points[2 * i];
    y += points[2 * i + 1];
  }

  return [x / numPoints, y / numPoints];
}

function unflattenPoints(points) {
  let unflattenedPoints = [];

  for (let i = 0; i < points.length / 2; i++) {
    let x = points[2 * i];
    let y = points[2 * i + 1];
    unflattenedPoints.push([x, y]);
  }

  return unflattenedPoints;
}

function normalizePoints(points, gridIndent) {
  let normalizedPoints = [];

  for (let i = 0; i < points.length; i++) {
    let normalizedX = points[i][0] / gridIndent;
    let normalizedY = points[i][1] / gridIndent;
    normalizedPoints.push([normalizedX, normalizedY]);
  }

  return normalizedPoints;
}

export function getAreaIntersectionRatio(
  figure1Points, figure2Points, gridIndent
) {
  let intersection = PolyBool.intersect({
    regions: [unflattenPoints(figure1Points)],
    inverted: false
  }, {
    regions: [unflattenPoints(figure2Points)],
    inverted: false
  });

  let intersectionArea = 0;

  for (let i = 0; i < intersection.regions.length; i++) {
    let polygon = normalizePoints(intersection.regions[i], gridIndent);
    intersectionArea += geometric.polygonArea(polygon);
  }

  let figureArea = geometric.polygonArea(
    normalizePoints(unflattenPoints(figure1Points), gridIndent)
  );

  let intersectionRatio = intersectionArea / figureArea;

  return intersectionRatio;
}

export function getSumOfDistances(
  figure1Points, figure2Points, gridIndent
) {
  let numPoints = figure1Points.length / 2;
  let sumOfDistances = 0;

  for (let i = 0; i < numPoints; i++) {
    let x1 = figure1Points[2 * i];
    let y1 = figure1Points[2 * i + 1];
    let x2 = figure2Points[2 * i];
    let y2 = figure2Points[2 * i + 1];

    sumOfDistances += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  sumOfDistances /= gridIndent;

  return sumOfDistances;
}

export function calcLevel1IntersectionRatio(
  figure1Points, figure2Points, gridIndent
) {
  return getAreaIntersectionRatio(figure1Points, figure2Points, gridIndent);
}

export function calcLevel1Metrics(
  figure1, figure2, gridIndent
) {
  let intersectionRatio = calcLevel1IntersectionRatio(
    figure1.points[figure1.stateIdx],
    figure2.points[figure2.stateIdx],
    gridIndent
  );

  let pathLength = getPathLength(
    figure1.points.slice(0, figure1.stateIdx + 1),
    gridIndent
  ) + getPathLength(
    figure2.points.slice(0, figure2.stateIdx + 1),
    gridIndent
  );

  let numTransformations = figure1.stateIdx + figure2.stateIdx;

  return {
    intersectionRatio: intersectionRatio,
    pathLength: pathLength,
    numTransformations: numTransformations
  };
}
