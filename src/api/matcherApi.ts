import {
  ProductMatchResponseSchema,
  type ProductMatchResult
} from "../types/product.ts";

const MOCK_API_DELAY = 1500;

export const uploadFileToMatch = async (file: File):Promise<ProductMatchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  const mockResponse = [
    {
      id: '1',
      originalName: 'Ноутбук Apple MacBook Air 13 M1',
      matchedName: 'Apple MacBook Air 13" M1 2020',
      confidenceScore: 98,
      status: 'matched',
    },
    {
      id: '2',
      originalName: 'Кабель USB-C - USB-C, черный, 1м',
      matchedName: 'Кабель Type-C 1.0m Black',
      confidenceScore: 65,
      status: 'review_needed',
    },
    {
      id: '3',
      originalName: 'Непонятный товар без артикула',
      matchedName: null,
      confidenceScore: 0,
      status: 'unmatched',
    }
  ];

  const parsedData = ProductMatchResponseSchema.parse(mockResponse);

  return parsedData;
}