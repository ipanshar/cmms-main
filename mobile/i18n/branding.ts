export const brandName = 'Shin-Line ТОиР';
export const shortBrandName = 'Shin-Line ТОиР';

const replacements: Array<[RegExp, string]> = [
  [/Atlas CMMS/g, `${brandName} CMMS`],
  [/Atlas’s/g, `${brandName}’s`],
  [/Atlas'(?=s)/g, `${brandName}'s`],
  [/Atlas’(?=s)/g, `${brandName}’s`],
  [/Atlas/g, brandName],
  [/\{\{\s*brandName\s*\}\}/g, brandName],
  [/\{\{\s*shortBrandName\s*\}\}/g, shortBrandName]
];

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const applyReplacements = (value: string): string => {
  return replacements.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    value
  );
};

export const applyBranding = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => applyBranding(item)) as unknown as T;
  }

  if (isObject(value)) {
    const result: Record<string, unknown> = {};

    Object.entries(value).forEach(([key, entry]) => {
      result[key] = applyBranding(entry);
    });

    return result as T;
  }

  if (typeof value === 'string') {
    return applyReplacements(value) as unknown as T;
  }

  return value;
};
