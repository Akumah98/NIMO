import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import fallbackData from "@/data/fallbackMedia.json";
import type { MediaItem } from "@/types";

const FALLBACK_MEDIA = fallbackData as MediaItem[];

export async function fetchMediaItems(category?: string): Promise<MediaItem[]> {
  try {
    const supabase = createClient();
    let query = supabase.from("media").select("*").order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (category && category !== "all") {
        return FALLBACK_MEDIA.filter((m) => m.category === category);
      }
      return FALLBACK_MEDIA;
    }
    return data;
  } catch {
    return FALLBACK_MEDIA;
  }
}

export async function uploadMediaFile(file: File, category = "general"): Promise<MediaItem> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const cleanName = slugify(file.name.replace(/\.[^/.]+$/, ""));
  const filePath = `uploads/${Date.now()}-${cleanName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

  const newRecord = {
    name: file.name,
    file_path: filePath,
    file_url: urlData.publicUrl,
    file_size: file.size,
    mime_type: file.type || "image/jpeg",
    category,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("media")
    .insert(newRecord)
    .select()
    .single();

  if (insertError) {
    throw new Error(`Database insert failed: ${insertError.message}`);
  }

  return inserted;
}

export async function deleteMediaItem(id: string, filePath: string): Promise<void> {
  const supabase = createClient();
  await supabase.storage.from("media").remove([filePath]);
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}
