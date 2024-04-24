export function getTime(dateStr: string) {
  if (!dateStr) return '';
  const formatter = new Intl.DateTimeFormat('ru-Ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = new Date(dateStr);
  return formatter.format(date);
}

export function isOneDay(date1Str: string, date2Str: string) {
  if (!date1Str || !date2Str) {
    return false;
  }
  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);

  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

export function formatDate(dateStr: string) {
  const formatter = new Intl.DateTimeFormat('ru-Ru', {
    day: '2-digit',
    month: 'long',
  });
  const date = new Date(dateStr);
  return formatter.format(date);
}
