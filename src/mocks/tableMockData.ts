import type {MatchStatus, TableRowData} from "../types/TableRowData.ts";

const statuses: MatchStatus[] = ['red', 'yellow', 'green'];

export const MOCK_DATA: TableRowData[] = Array.from({length: 42}, (_, i) => ({
  id: `ART-${1000 + i}`,
  supplierName: `Товар от поставщика №${i + 1}`,
  cmsName: `Номенклатура CMS — Позиция ${i + 1}`,
  quantity: Math.floor(Math.random() * 150) + 1,
  price: Math.floor(Math.random() * 8000) + 150,
  matchStatus: statuses[Math.floor(Math.random() * 3)],
}));