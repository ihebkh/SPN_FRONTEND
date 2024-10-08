export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
};

export function parseDate(dateStr: string) {
  const date = new Date(dateStr);

  return !isNaN(date.getTime()) ? date.toISOString() : null;
}
