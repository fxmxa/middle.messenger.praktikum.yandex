export default function last(data: Array<any>) {
  if (!Array.isArray(data) || !data.length) {
    return undefined;
  }

  return data[data.length - 1];
}
