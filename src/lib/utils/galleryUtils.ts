export interface GalleryPhoto {
  url: string;
  caption: string;
}

export function parseGalleryPhoto(raw: string, fallbackTitle = ""): GalleryPhoto {
  if (!raw) return { url: "", caption: "" };
  if (raw.includes("|")) {
    const [url, ...parts] = raw.split("|");
    return {
      url: url.trim(),
      caption: parts.join("|").trim(),
    };
  }
  return {
    url: raw.trim(),
    caption: fallbackTitle,
  };
}

export function extractPhotoUrl(raw: string): string {
  if (!raw) return "";
  return raw.includes("|") ? raw.split("|")[0].trim() : raw.trim();
}
