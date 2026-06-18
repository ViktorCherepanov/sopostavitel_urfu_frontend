import type { MatchResultDto } from '../types/ApiTypes';
import type { TableRowData } from '../types/TableRowData';

export const mapApiToTableRow = (dto: MatchResultDto): TableRowData => ({
  id: dto.article,
  supplierName: dto.supplier_name,
  cmsName: dto.predicted_name,
  quantity: dto.quantity,
  price: dto.price,
  matchPercentage: dto.prediction_percent,
  suggestedCmsNames: dto.similar_predicted_names,
  manuallyMatched: false,
});

export const mapTableRowToDto = (row: TableRowData): MatchResultDto => ({
  article: row.id,
  supplier_name: row.supplierName,
  predicted_name: row.cmsName,
  quantity: row.quantity,
  price: row.price,
  prediction_percent: row.matchPercentage,
  similar_predicted_names: row.suggestedCmsNames ?? [],
});