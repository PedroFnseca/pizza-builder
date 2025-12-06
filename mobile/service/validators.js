export const requireString = (value, fieldName) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    throw new Error(`${fieldName} is required`);
  }
  return trimmed;
};

export const optionalString = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed || undefined;
};

export const requireStringArray = (value, fieldName) => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${fieldName} must contain at least one item`);
  }
  const cleaned = value.map((item) => requireString(item, `${fieldName} item`));
  return cleaned;
};

export const requireNumber = (value, fieldName) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${fieldName} must be a number`);
  }
  return parsed;
};

export const optionalNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};
