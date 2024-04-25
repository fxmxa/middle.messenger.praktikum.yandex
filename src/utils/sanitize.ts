export default function sanitize(content: string): string {
  return content.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
