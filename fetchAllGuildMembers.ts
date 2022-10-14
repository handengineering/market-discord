import { fetchGuildMembersChunk } from "./fetchGuildMembersChunk.ts";

export async function fetchAllGuildMembers(
  previousMembers: Array<{ user: { id: string } }> = [],
  lastUserId?: string
): Promise<string> {
  const response = await fetchGuildMembersChunk(lastUserId);

  const clonedResponse = response.clone();

  const newMembers = await clonedResponse.json();

  const members =
    newMembers.length > 0
      ? [...previousMembers, ...newMembers]
      : previousMembers;

  const lastItem = members[members.length - 1];

  if (newMembers.length > 0) {
    return await fetchAllGuildMembers(members, lastItem.user.id);
  } else {
    return JSON.stringify(members);
  }
}
