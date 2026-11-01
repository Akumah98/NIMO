import { createClient } from "@/lib/supabase/client";
import teamData from "@/data/teamData.json";
import type { TeamMember } from "@/types/team";
import { mapDbToMember, mapMemberToDb } from "./teamMappers";

const FALLBACK_MEMBERS = teamData.members as TeamMember[];

export async function fetchPublicTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_MEMBERS;
    return data.map(mapDbToMember);
  } catch {
    return FALLBACK_MEMBERS;
  }
}

export async function fetchAdminTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_MEMBERS;
    return data.map(mapDbToMember);
  } catch {
    return FALLBACK_MEMBERS;
  }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("team_members").select("*").eq("id", id).single();
    if (data) return mapDbToMember(data);
  } catch {}
  return FALLBACK_MEMBERS.find((m) => m.id === id) || null;
}

export async function saveTeamMember(
  payload: Partial<TeamMember>,
  id?: string
): Promise<{ data: TeamMember | null; error: string | null }> {
  try {
    const supabase = createClient();
    const dbPayload = mapMemberToDb(payload);
    const result = id
      ? await supabase.from("team_members").update(dbPayload).eq("id", id).select().single()
      : await supabase.from("team_members").insert(dbPayload).select().single();
    if (result.error) return { data: null, error: result.error.message };
    return { data: mapDbToMember(result.data), error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save team member";
    return { data: null, error: message };
  }
}

export async function deleteTeamMember(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return { success: false, error: message };
  }
}
