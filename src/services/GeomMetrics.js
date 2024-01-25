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

export function getIntersectionArea(
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

  /*
  let figureArea = geometric.polygonArea(
    normalizePoints(unflattenPoints(figure1Points), gridIndent)
  );
  
  let intersectionRatio = intersectionArea / figureArea;
  */

  return intersectionArea;
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

/*
export function calcLevel1IntersectionRatio(
  figure1Points, figure2Points, gridIndent
) {
  // Building polygon for figure1 rectangle
  let rectangle1Points = [
    [figure1Points[0], figure1Points[1]],
    [figure1Points[2], figure1Points[3]]
  ];

  let rotationPoint = geometric.pointRotate(
    rectangle1Points[0], 180,
    [
      figure1Points[figure1Points.length - 4],
      figure1Points[figure1Points.length - 3]
    ]
  );
  rectangle1Points.push(geometric.pointRotate(rectangle1Points[1], 180, rotationPoint));

  rotationPoint = geometric.pointRotate(
    rectangle1Points[1], 180,
    [
      figure1Points[figure1Points.length - 4],
      figure1Points[figure1Points.length - 3]
    ]
  );
  rectangle1Points.push(geometric.pointRotate(rectangle1Points[0], 180, rotationPoint));

  // Building polygon for figure2 rectangle
  let length2 = figure2Points.length;

  let rectangle2Points = [
    [figure2Points[length2 - 2], figure2Points[length2 - 1]],
    [figure2Points[length2 - 4], figure2Points[length2 - 3]]
  ];

  rotationPoint = geometric.pointRotate(
    rectangle2Points[0], 180,
    [
      figure2Points[4],
      figure2Points[5]
    ]
  );
  rectangle2Points.push(geometric.pointRotate(rectangle2Points[1], 180, rotationPoint));

  rotationPoint = geometric.pointRotate(
    rectangle2Points[1], 180,
    [
      figure2Points[4],
      figure2Points[5]
    ]
  );
  rectangle2Points.push(geometric.pointRotate(rectangle2Points[0], 180, rotationPoint));

  let rectanglesIntersectionArea = getIntersectionArea(
    rectangle1Points.flat(), rectangle2Points.flat(), gridIndent
  );

  let figuresIntersectionArea = getIntersectionArea(
    figure1Points, figure2Points, gridIndent
  );

  let rectangleArea = geometric.polygonArea(
    normalizePoints(rectangle1Points, gridIndent)
  );

  return (rectanglesIntersectionArea - figuresIntersectionArea) / rectangleArea;
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

export function calcLevel2Metrics(
  figure1, figure2, figure3, gridIndent
) {
  let pathLength = getPathLength(
    figure1.points.slice(0, figure1.stateIdx + 1),
    gridIndent
  ) + getPathLength(
    figure2.points.slice(0, figure2.stateIdx + 1),
    gridIndent
  ) + getPathLength(
    figure3.points.slice(0, figure3.stateIdx + 1),
    gridIndent
  );

  let numTransformations =
    figure1.stateIdx +
    figure2.stateIdx +
    figure3.stateIdx;

  return {
    intersectionRatio: 1.0,
    pathLength: pathLength,
    numTransformations: numTransformations
  };
} */

export function calcMetrics(figures, gridIndent) {
  let pathLength = 0;
  let numTransformations = 0;

  for (let i = 0; i < figures.length; i++) {
    pathLength += getPathLength(
      figures[i].points.slice(0, figures[i].stateIdx + 1),
      gridIndent
    );

    numTransformations += figures[i].stateIdx;
  }

  return {
    intersectionRatio: 1.0,
    pathLength: pathLength,
    numTransformations: numTransformations
  };
}
