import { create } from "zustand";
import { Broker } from "./brokers.store";

export type ImportFile = { name: string; uri: string; mimeType?: string; size?: number };

// What comes out of Step 2 mapping — raw strings, not yet resolved to FKs
export type ParsedRow = {
  date?: string;
  instrumentSymbol?: string;
  units?: string;
  pricePerUnit?: string;
  value?: string;
  tradeType?: string;       // BUY / SELL → resolves to statusId
  description?: string;
  metadata: Record<string, any>;
};
export type InstrumentMapping = {
  name: string;
  assetId: number;
  entityId: number;
  subClassId: number;
};
type ImportStore = {
  broker: Broker | null;
  file: ImportFile | null;
  rawRows: any[][];
  headerRow: number;
  columnMapping: Record<string, string | null>;
  parsedData: ParsedRow[];
  instrumentMappings: Record<string, InstrumentMapping>;
  setInstrumentMapping: (symbol: string, mapping: InstrumentMapping | null) => void;

  setBroker: (broker: Broker) => void;
  setFile: (file: ImportFile) => void;
  setRawRows: (rows: any[][]) => void;
  setHeaderRow: (row: number) => void;
  setColumnMapping: (mapping: Record<string, string | null>) => void;
  setParsedData: (data: ParsedRow[]) => void;
  reset: () => void;
};

export const useImportStore = create<ImportStore>((set) => ({
  broker: null,
  file: null,
  rawRows: [],
  headerRow: -1,
  columnMapping: {},
  parsedData: [],
  instrumentMappings: {},
  setInstrumentMapping: (symbol, mapping) => 
    set((state) => ({
      instrumentMappings: mapping 
        ? { ...state.instrumentMappings, [symbol]: mapping }
        : Object.fromEntries(Object.entries(state.instrumentMappings).filter(([k]) => k !== symbol))
    })),
  setBroker: (broker) => set({ broker }),
  setFile: (file) => set({ file }),
  setRawRows: (rows) => set({ rawRows: rows }),
  setHeaderRow: (row) => set({ headerRow: row }),
  setColumnMapping: (mapping) => set({ columnMapping: mapping }),
  setParsedData: (data) => set({ parsedData: data }),

  reset: () => set({ broker: null, file: null, rawRows: [], headerRow: -1, columnMapping: {}, parsedData: [] }),
}));