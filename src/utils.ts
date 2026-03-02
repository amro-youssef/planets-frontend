export function isValidUrl(url: string): boolean {
  // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // validate fragment locator
  return !!urlPattern.test(url);
}

export async function isValidImageUrl(url: string): Promise<boolean> {
  const res = await fetch(url);
  const buff = await res.blob();
  return buff.type.startsWith("image/");
}

export function getApiBase(): string {
  // In dev use the Vite proxy at /api which forwards to the remote backend.
  // In production use VITE_API_BASE if provided, otherwise fall back to the real backend URL.
  return import.meta.env.DEV
    ? "/api"
    : (import.meta.env.VITE_API_BASE ??
        "https://planets-backend-production.up.railway.app");
}