export const STAGE_WIDTH = Math.max(1024, window.innerWidth) * 0.75;
export const GRID_INDENT = STAGE_WIDTH / 50;
export const STAGE_HEIGHT = GRID_INDENT * 30;

export const LINE_POINTS = [
  {
    id: "0",
    x: 20 * GRID_INDENT,
    y: 15 * GRID_INDENT
  },
  {
    id: "1",
    x: 25 * GRID_INDENT,
    y: 20 * GRID_INDENT
  }
];

export const ANGLE_POINTS = [
  {
    id: "0",
    x: 15 * GRID_INDENT,
    y: 5 * GRID_INDENT
  },
  {
    id: "1",
    x: 20 * GRID_INDENT,
    y: 3 * GRID_INDENT      
  },
  {
    id: "2",
    x: 22 * GRID_INDENT,
    y: 8 * GRID_INDENT      
  }
];

export const INITIAL_FIGURE_STATE = [
  GRID_INDENT, 29 * GRID_INDENT,
  6 * GRID_INDENT, 29 * GRID_INDENT,
  GRID_INDENT, 26 * GRID_INDENT
];
