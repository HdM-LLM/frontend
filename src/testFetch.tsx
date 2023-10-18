export async function fetchData(url: string): Promise<any> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  if (contentType && contentType.indexOf("text") !== -1) {
    return res.text();
  }
  throw new Error("Unsupported content type");
}
