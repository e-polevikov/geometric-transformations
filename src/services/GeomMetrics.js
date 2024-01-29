import * as PolyBool from 'polybooljs';
import * as geometric from 'geometric'

import { COST } from '../constants/Transformations';

export function calcMetrics(figures, gridIndent, minFiguresPerimeter) {
  let pathLength = 0;
  let cost = 0;

  for (let i = 0; i < figures.length; i++) {
    pathLength += getPathLength(
      figures[i].points.slice(0, figures[i].stateIdx + 1),
      gridIndent
    );

    for (let j = 0; j < figures[i].stateIdx; j++) {
      let transformation = figures[i].transformations[j];
      cost += COST[transformation];
    }
  }

  let similarity = getSimilarity(
    figures, gridIndent, minFiguresPerimeter
  );

  return {
    similarity: similarity,
    pathLength: pathLength,
    cost: cost
  };
}

export function getSimilarity(figures, gridIndent, minFiguresPerimeter) {
  let figuresPolygons = figures.map((figure) => {
    return {
      regions: [unflattenPoints(figure.points[figure.stateIdx])],
      inverted: false
    };
  });

  let figuresXor = figuresPolygons[0];
  let figuresUnion = figuresPolygons[0];

  for (let i = 1; i < figuresPolygons.length; i++) {
    figuresXor = PolyBool.xor(figuresXor, figuresPolygons[i]);
    figuresUnion = PolyBool.union(figuresUnion, figuresPolygons[i]);
  }

  let figuresXorArea = 0;
  for (let i = 0; i < figuresXor.regions.length; i++) {
    let polygon = normalizePoints(figuresXor.regions[i], gridIndent);
    figuresXorArea += geometric.polygonArea(polygon);
  }

  let convexHull = normalizePoints(
    geometric.polygonHull(figuresUnion.regions.flat()),
    gridIndent
  );

  let convexHullArea = geometric.polygonArea(convexHull);
  let similarity = figuresXorArea / convexHullArea;

  let figuresIntersect = false;
  for (let i = 0; i < figuresPolygons.length - 1; i++) {
    for (let j = i + 1; j < figuresPolygons.length; j++) {
      let intersection = PolyBool.intersect(figuresPolygons[i], figuresPolygons[j]);
      if (intersection.regions.length > 0) {
        figuresIntersect = true;
        break;
      }
    }
  }

  if (!figuresIntersect) {
    let convexHullPerimeter = getConvexHullPerimeter(convexHull);
    similarity += minFiguresPerimeter / convexHullPerimeter;
  }

  return similarity * 50;
}

function getConvexHullPerimeter(convexHull) {
  let convexHullPerimeter = 0;

  for (let i = 0; i < convexHull.length - 1; i++) {
    let [x1, y1] = convexHull[i];
    let [x2, y2] = convexHull[i + 1];
  
    convexHullPerimeter += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  let [x1, y1] = convexHull[0];
  let [x2, y2] = convexHull[convexHull.length - 1];

  convexHullPerimeter += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  return convexHullPerimeter;
}

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
