import { config } from "https://deno.land/x/dotenv/mod.ts";
const discordBotToken = config().DISCORD_BOT_TOKEN;
const discordGuildId = config().DISCORD_GUILD_ID;

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
