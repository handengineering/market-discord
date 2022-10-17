import { config } from "https://deno.land/x/dotenv/mod.ts";
import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import { parseURL, connect } from "https://deno.land/x/redis/mod.ts";
import { fetchAllGuildMembers } from "./fetchAllGuildMembers.ts";
import { DiscordGuildMember } from "./types.ts";

const redisUrl = Deno.env.get("REDIS_URL") || config().REDIS_URL;
const connectionOptions = parseURL(redisUrl);

const redis = await connect(connectionOptions);

setInterval(async () => {
  const allGuildMembers = await fetchAllGuildMembers();

  const allGuildMembersJson: DiscordGuildMember[] = JSON.parse(allGuildMembers);

  const discordGuildMemberIds = allGuildMembersJson.map(
    (guildMember) => guildMember.user.id
  );

  console.log("GETTING");
  console.log(`Length: ${discordGuildMemberIds.length}`);
  await redis.set(
    "discordGuildMemberIds",
    JSON.stringify(discordGuildMemberIds)
  );
}, 60000);

const port = 8081;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

await serve(handler, { port });
