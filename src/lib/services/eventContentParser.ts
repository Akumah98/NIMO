export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; caption: string; placement: "full" | "left" | "right"; aspect: string }
  | { type: "collage"; items: { url: string; caption?: string }[]; cols: "3" | "2" | "asymmetric"; aspect: "square" | "video" | "standard" | "compact" };

export function parseEventBody(raw: string): ContentBlock[] {
  if (!raw) return [];
  const blocks: ContentBlock[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith(":::collage")) {
      const colMatch = line.match(/cols="([^"]+)"/);
      const aspectMatch = line.match(/aspect="([^"]+)"/);
      const cols = (colMatch?.[1] || "3") as "3" | "2" | "asymmetric";
      const aspect = (aspectMatch?.[1] || "square") as "square" | "video" | "standard" | "compact";
      const items: { url: string; caption?: string }[] = [];
      i++;

      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        const imgMatch = lines[i].match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) items.push({ caption: imgMatch[1], url: imgMatch[2].trim() });
        i++;
      }
      if (items.length > 0) blocks.push({ type: "collage", items, cols, aspect });
      i++;
      continue;
    }

    const singleImg = line.match(/^!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)$/);
    if (singleImg) {
      const caption = singleImg[1] || "";
      const url = singleImg[2] || "";
      const meta = singleImg[3] || "";
      const placementMatch = meta.match(/placement:([a-z]+)/);
      const aspectMatch = meta.match(/aspect:([a-z]+)/);
      const placement = (placementMatch?.[1] || "full") as "full" | "left" | "right";
      const aspect = aspectMatch?.[1] || "video";
      blocks.push({ type: "image", url, caption, placement, aspect });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.replace(/^##\s+/, "") });
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.replace(/^###\s+/, "") });
    } else if (line.startsWith("> ")) {
      blocks.push({ type: "quote", text: line.replace(/^>\s+/, "") });
    } else if (line.startsWith("- ")) {
      const listItems = [line.replace(/^-\s+/, "")];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) {
        i++;
        listItems.push(lines[i].trim().replace(/^-\s+/, ""));
      }
      blocks.push({ type: "list", items: listItems });
    } else if (line.length > 0) {
      blocks.push({ type: "paragraph", text: line });
    }
    i++;
  }
  return blocks;
}

