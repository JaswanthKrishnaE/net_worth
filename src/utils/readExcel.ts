import * as XLSX from "xlsx";

export async function readExcelFile(
  uri: string
): Promise<any[][]> {
  const response = await fetch(uri);

  const arrayBuffer =
    await response.arrayBuffer();

  const workbook = XLSX.read(
    arrayBuffer,
    {
      type: "array",
    }
  );

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  return XLSX.utils.sheet_to_json(
    sheet,
    {
      header: 1,
      blankrows: false,
    }
  ) as any[][];
}