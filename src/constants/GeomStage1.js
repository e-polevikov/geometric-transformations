export const GRID_SIZE = {
  WIDTH: 17,
  HEIGHT: 12
};

export const STAGE_WIDTH = Math.max(1024, window.innerWidth) * 0.75;
export const GRID_INDENT = STAGE_WIDTH / GRID_SIZE.WIDTH;
export const STAGE_HEIGHT = GRID_INDENT * GRID_SIZE.HEIGHT;

export const LINE_POINTS = [{
    id: "0",
    x: 1 * GRID_INDENT,
    y: 1 * GRID_INDENT,
    isDragging: false
  }, {
    id: "1",
    x: 4 * GRID_INDENT,
    y: 6 * GRID_INDENT,
    isDragging: false
  }
];

export const ANGLE_POINTS = [{
    id: "0",
    x: 3 * GRID_INDENT,
    y: 1 * GRID_INDENT,
    isDragging: false
  }, {
    id: "1",
    x: 7 * GRID_INDENT,
    y: 2 * GRID_INDENT,
    isDragging: false
  }, {
    id: "2",
    x: 6 * GRID_INDENT,
    y: 4 * GRID_INDENT,
    isDragging: false
  }
];

export const FIGURE = { POINTS: [
  0 * GRID_INDENT, 10 * GRID_INDENT,
  0 * GRID_INDENT, 12 * GRID_INDENT,
  3 * GRID_INDENT, 12 * GRID_INDENT
]};

export const TARGET_FIGURE = { POINTS: [
  STAGE_WIDTH - 3 * GRID_INDENT, 0 * GRID_INDENT,
  STAGE_WIDTH - 3 * GRID_INDENT, 2 * GRID_INDENT,
  STAGE_WIDTH - 0 * GRID_INDENT, 2 * GRID_INDENT
]};
