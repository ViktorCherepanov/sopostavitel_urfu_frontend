import type {MatchStatus} from "../types/TableRowData.ts";

export const STATUS_ORDER: Record<MatchStatus, MatchStatus[]> = {
  green: ['green', 'yellow', 'red'],
  yellow: ['yellow', 'green', 'red'],
  red: ['red', 'yellow', 'green'],
};

export const COLOR: Record<MatchStatus, string> = {
  green: '#2B9348',
  yellow: '#FFBF3B',
  red: '#CC313D',
};