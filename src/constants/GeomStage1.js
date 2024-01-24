export const GRID_SIZE = {
  WIDTH: 20,
  HEIGHT: 14
};

export const STAGE_WIDTH = Math.max(1024, window.innerWidth) * 0.625;
export const GRID_INDENT = STAGE_WIDTH / GRID_SIZE.WIDTH;
export const STAGE_HEIGHT = GRID_INDENT * GRID_SIZE.HEIGHT;

export const ANGLE_POINTS = [{
    id: "0",
    x: 1 * GRID_INDENT,
    y: 6 * GRID_INDENT,
    isDragging: false
  }, {
    id: "1",
    x: 1 * GRID_INDENT,
    y: 9 * GRID_INDENT,
    isDragging: false
  }, {
    id: "2",
    x: 3 * GRID_INDENT,
    y: 9 * GRID_INDENT,
    isDragging: false
  }
];

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

export const FIGURE1 = { POINTS: [
  1 * GRID_INDENT, 11 * GRID_INDENT,
  1 * GRID_INDENT, 13 * GRID_INDENT,
  4 * GRID_INDENT, 13 * GRID_INDENT,
  4 * GRID_INDENT, 12 * GRID_INDENT,
  2 * GRID_INDENT, 12 * GRID_INDENT,
  2 * GRID_INDENT, 11 * GRID_INDENT
]};

export const FIGURE2 = { POINTS: [
  STAGE_WIDTH - 4 * GRID_INDENT, 1 * GRID_INDENT,
  STAGE_WIDTH - 4 * GRID_INDENT, 2 * GRID_INDENT,
  STAGE_WIDTH - 2 * GRID_INDENT, 2 * GRID_INDENT,
  STAGE_WIDTH - 2 * GRID_INDENT, 3 * GRID_INDENT,
  STAGE_WIDTH - 1 * GRID_INDENT, 3 * GRID_INDENT,
  STAGE_WIDTH - 1 * GRID_INDENT, 1 * GRID_INDENT
]};
