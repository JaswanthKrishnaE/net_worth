export function detectHeaderRow(
  rows: string[][]
): number {
  const keywords = [
    "date",
    "symbol",
    "qty",
    "quantity",
    "units",
    "price",
    "amount",
    "value",
  ];

  let bestRow = 0;
  let bestScore = 0;

  rows.forEach((row, index) => {
    let score = 0;

    row.forEach((cell) => {
      const text =
        String(cell)
          .toLowerCase()
          .trim();

      if (
        keywords.some((k) =>
          text.includes(k)
        )
      ) {
        score++;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestRow = index;
    }
  });

  return bestRow;
}