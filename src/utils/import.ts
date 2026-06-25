export function findHeaderRow(
  rows: any[][]
): number {
  return rows.findIndex(
    row =>
      row.includes("Symbol") &&
      row.includes("Trade Date")
  );
}