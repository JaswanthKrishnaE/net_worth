export function findHeaderRow(
  rows: any[][]
): number {
  let bestRow = -1;
  let bestScore = -1;

  rows.forEach((row, index) => {
    if (!row || row.length < 3) {
      return;
    }

    const text = row
      .join(" ")
      .toLowerCase();

    const keywords = [
      "date",
      "trade",
      "symbol",
      "isin",
      "exchange",
      "quantity",
      "price",
      "amount",
      "type",
      "buy",
      "sell",
      "order",
    ];

    let score = 0;

    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
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