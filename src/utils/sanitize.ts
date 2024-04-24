export default function (content: string): string {
  return content.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
