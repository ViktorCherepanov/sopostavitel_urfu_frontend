export interface TableRowData {
  id: string;
  supplierName: string;
  cmsName: string;
  quantity: number;
  price: number;
  matchStatus: MatchStatus;
}

export type MatchStatus = 'red' | 'yellow' | 'green';

export type ActiveSort = 'column' | 'status' | null;