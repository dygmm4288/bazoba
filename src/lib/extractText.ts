export function extractText(htmlString: string) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}
