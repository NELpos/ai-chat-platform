export function isValidJSON(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
}

export function formatJSON(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return json;
  }
}

export function parseJSON(json: string): any {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function isValidJSONValue(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}
