import { config } from "https://deno.land/x/dotenv/mod.ts";
const discordBotToken =
  Deno.env.get("DISCORD_BOT_TOKEN") || config().DISCORD_BOT_TOKEN;
const discordGuildId =
  Deno.env.get("DISCORD_GUILD_ID") || config().DISCORD_GUILD_ID;

export function fetchGuildMembersChunk(lastUserId?: string) {
  const authHeaders = {
    Authorization: `Bot ${discordBotToken}`,
  };

  const snowflakeQuery = lastUserId ? `&after=${lastUserId}` : "";

  return fetch(
    `https://discordapp.com/api/guilds/${discordGuildId}/members?limit=1000${snowflakeQuery}`,
    {
      headers: authHeaders,
    }
  );
}
