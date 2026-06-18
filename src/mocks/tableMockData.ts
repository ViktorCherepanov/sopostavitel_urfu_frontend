import type { TableRowData } from "../types/TableRowData.ts";

export const MOCK_DATA: TableRowData[] = Array.from({ length: 412 }, (_, i) => {
  const zoneType = i % 3;

  let matchPercentage: number;
  let cmsName = `Номенклатура CMS — Позиция ${i + 1}`;
  let suggestedCmsNames: string[] = [];

  if (zoneType === 0) {
    matchPercentage = Math.floor(Math.random() * 16) + 85; // от 85% до 100%
  }
  else if (zoneType === 1) {
    matchPercentage = Math.floor(Math.random() * 35) + 45; // от 45% до 79%
    cmsName = `Номенклатура CMS (Частичное совпадение) — Позиция ${i + 1}`;
    suggestedCmsNames = [
      `Номенклатура CMS — Позиция ${i + 1} (Точный аналог)`,
      `Альтернативный вариант со склада №${i + 1}`,
      `Модификация товара №${i + 1} (ГОСТ)`
    ];
  }
  else {
    matchPercentage = Math.floor(Math.random() * 35) + 5; // от 5% до 39%
    cmsName = 'Не сопоставлено (Требуется ручной выбор)';
    suggestedCmsNames = [
      `Номенклатура CMS — Позиция ${i + 1}`,
      `Похожий товар по артикулу (ID: ${1000 + i})`,
      `Близкое совпадение по описанию поставщика`,
      `Внести как новую позицию в справочник CMS`
    ];
  }

  return {
    id: `ART-${1000 + i}`,
    supplierName: `Товар от поставщика №${i + 1}`,
    cmsName,
    quantity: Math.floor(Math.random() * 150) + 1,
    price: Math.floor(Math.random() * 8000) + 150,
    matchPercentage,
    suggestedCmsNames,
  };
});