export interface MediaItem {
  id: string;
  name: string;
  file_path: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  category?: string;
  created_at: string;
}
