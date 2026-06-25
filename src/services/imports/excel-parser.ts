import * as FileSystem from "expo-file-system/legacy";
import * as XLSX from "xlsx";

export async function parseExcelFile(
  uri: string
): Promise<string[][]> {
  const base64 =
    await FileSystem.readAsStringAsync(
      uri,
      {
        encoding:
          FileSystem.EncodingType.Base64,
      }
    );

  const workbook =
    XLSX.read(base64, {
      type: "base64",
    });

  const firstSheet =
    workbook.SheetNames[0];

  const worksheet =
    workbook.Sheets[firstSheet];

  const rows =
    XLSX.utils.sheet_to_json(
      worksheet,
      {
        header: 1,
        blankrows: false,
      }
    );

  return rows as string[][];
}