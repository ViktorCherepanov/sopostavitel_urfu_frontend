import type { MatchResultDto } from '../types/ApiTypes';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;
const API_KEY = import.meta.env.VITE_API_KEY;

export const uploadFile = async (file: File): Promise<MatchResultDto[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/match/upload`, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }

  return response.json();
};

export const exportFile = async (data: MatchResultDto[]): Promise<void> => {
  const response = await fetch(`${BASE_URL}/match/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Ошибка экспорта: ${response.status}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'journal.xlsx';
  a.click();
  URL.revokeObjectURL(url);
};