export interface MatchResultDto {
  article: string;
  supplier_name: string;
  predicted_name: string;
  quantity: number;
  price: number;
  prediction_percent: number;
  similar_predicted_names: string[];
}