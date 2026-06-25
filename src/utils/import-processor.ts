// utils/import-processor.ts
export const processImportData = (rows: any[][], headerRow: number, mapping: Record<string, string | null>) => {
  const headers = rows[headerRow];
  const dataRows = rows.slice(headerRow + 1);

  return dataRows.map((row) => {
    const core: any = {};
    const meta: any = {};

    headers.forEach((headerName, index) => {
      const field = mapping[headerName];
      if (field === 'IGNORE') return; // Completely discard
      if (field) {
        core[field] = row[index]; // Map to DB field
      } else {
        meta[headerName] = row[index]; // Default: Metadata
      }
    });
    return { ...core, metadata: meta };
  });
};