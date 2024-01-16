export const STAGE_WIDTH = Math.max(1024, window.innerWidth) * 0.75;
export const GRID_INDENT = STAGE_WIDTH / 50;
export const STAGE_HEIGHT = GRID_INDENT * 30;

export const LINE_POINTS = [
  {
    id: "0",
    x: 7 * GRID_INDENT,
    y: 13 * GRID_INDENT
  },
  {
    id: "1",
    x: 12 * GRID_INDENT,
    y: 28 * GRID_INDENT
  }
];

export const ANGLE_POINTS = [
  {
    id: "0",
    x: 2 * GRID_INDENT,
    y: 18 * GRID_INDENT
  },
  {
    id: "1",
    x: 4 * GRID_INDENT,
    y: 22 * GRID_INDENT
  },
  {
    id: "2",
    x: 5 * GRID_INDENT,
    y: 17 * GRID_INDENT
  }
];

export const FIGURE_POINTS = [
  GRID_INDENT, 29 * GRID_INDENT,
  6 * GRID_INDENT, 29 * GRID_INDENT,
  GRID_INDENT, 26 * GRID_INDENT
];

export const TARGET_FIGURE_POINTS = [
  STAGE_WIDTH - 10 * GRID_INDENT, 5 * GRID_INDENT,
  STAGE_WIDTH - 5 * GRID_INDENT, 5 * GRID_INDENT,
  STAGE_WIDTH - 10 * GRID_INDENT, 2 * GRID_INDENT,
];
