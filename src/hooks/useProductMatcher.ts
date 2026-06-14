import {useCallback, useState} from "react";
import type {ProductMatchResult} from "../types/product.ts";
import {uploadFileToMatch} from "../api/matcherApi.ts";

export const useProductMatcher = () => {
  const [data, setData] = useState<ProductMatchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadFileToMatch();
      setData(result);
    } catch (error) {
      console.error('Ошибка при обработке файла: ', error);
      setError('Не удалось обработать файл. Проверьте формат или попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProductMatch = useCallback((id: string, updates: Partial<ProductMatchResult>) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  return {
    data,
    isLoading,
    error,
    processFile,
    updateProductMatch,
  }
}