import { createClient } from "@/lib/supabase/client";
import { resolveMimeType, buildStoragePath } from "@/lib/utils/mimeUtils";
import fallbackData from "@/data/fallbackMedia.json";
import type { MediaItem } from "@/types";

const FALLBACK_MEDIA = fallbackData as MediaItem[];

export async function fetchMediaItems(category?: string): Promise<MediaItem[]> {
  try {
    const supabase = createClient();
    let query = supabase.from("media").select("*").order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = category === "files" ? query.in("category", ["reports", "resources"]) : query.eq("category", category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (!category || category === "all") return FALLBACK_MEDIA;
      return FALLBACK_MEDIA.filter((m) =>
        category === "files"
          ? m.category === "reports" || m.category === "resources" || m.mime_type?.includes("pdf")
          : m.category === category
      );
    }
    return data;
  } catch {
    return FALLBACK_MEDIA;
  }
}

export async function uploadMediaFile(
  file: File,
  category = "general",
  bucket = "media"
): Promise<MediaItem> {
  const supabase = createClient();
  const filePath = buildStoragePath(category, file.name);

  let targetBucket = bucket;
  let { error: uploadError } = await supabase.storage.from(targetBucket).upload(filePath, file);

  if (uploadError && targetBucket !== "media") {
    targetBucket = "media";
    const res = await supabase.storage.from("media").upload(filePath, file);
    uploadError = res.error;
  }
  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(filePath);
  const newRecord = {
    name: file.name,
    file_path: filePath,
    file_url: urlData.publicUrl,
    file_size: file.size,
    mime_type: resolveMimeType(file.name, file.type),
    category,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("media")
    .insert(newRecord)
    .select()
    .single();

  if (insertError) {
    return { id: `local-${Date.now()}`, created_at: new Date().toISOString(), ...newRecord };
  }
  return inserted;
}

export async function deleteMediaItem(id: string, filePath: string): Promise<void> {
  const supabase = createClient();
  await supabase.storage.from("media").remove([filePath]);
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
