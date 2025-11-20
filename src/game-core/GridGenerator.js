// generates rows x cols grid with pairs, and places blocked tiles
export function generateGrid(rows, columns, blockedCount = 0) {
  // Ensure even number of non-blocked cells for pair generation
  const total = rows * columns;
  const cells = Array.from({ length: total }, (_, i) => ({ id: i }));

  // create pairs values for all cells (1..9)
  const values = [];
  const pairCount = Math.floor((total - blockedCount) / 2);
  for (let i = 0; i < pairCount; i++) {
    const num = Math.floor(Math.random() * 9) + 1;
    values.push(num, num);
  }
  // if odd remaining, add a random
  while (values.length < total - blockedCount) values.push(Math.floor(Math.random() * 9) + 1);

  // shuffle values
  values.sort(() => Math.random() - 0.5);

  // build grid rows
  const grid = [];
  let vi = 0;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      row.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        value: values[vi] !== undefined ? values[vi++] : null,
        matched: false,
        blocked: false,
      });
    }
    grid.push(row);
  }

  // randomly mark blocked tiles (can't be selected)
  const flat = grid.flat().filter((cell) => !cell.matched && cell.value !== null);
  if (blockedCount > 0) {
    for (let i = 0; i < blockedCount; i++) {
      const idx = Math.floor(Math.random() * flat.length);
      const tile = flat.splice(idx, 1)[0];
      if (tile) {
        const gCell = grid[tile.row][tile.col];
        gCell.blocked = true;
        gCell.value = "X";
      }
    }
  }

  return grid;
}
