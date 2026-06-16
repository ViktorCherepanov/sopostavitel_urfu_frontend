import type {MatchStatus, TableRowData} from "../types/TableRowData.ts";

export const getStatusByPercentage = (
  percentage: number,
  manuallyMatched?: TableRowData['manuallyMatched']
): MatchStatus => {
  if (manuallyMatched) return 'green';
  if (percentage >= 80) return 'green';
  if (percentage >= 40) return 'yellow';
  return 'red';
};