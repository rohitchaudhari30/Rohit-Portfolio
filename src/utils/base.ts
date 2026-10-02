export function withBase(path: string | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  let base = import.meta.env.BASE_URL || "/Rohit-Portfolio/";
  if (base === "./" || base === ".") {
    base = "/Rohit-Portfolio/";
  }
  
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
