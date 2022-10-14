import { config } from "https://deno.land/x/dotenv/mod.ts";
import { parseURL, connect } from "https://deno.land/x/redis/mod.ts";
import { fetchAllGuildMembers } from "./fetchAllGuildMembers.ts";

const redisUrl = config().REDIS_URL;
const connectionOptions = parseURL(redisUrl);

const redis = await connect(connectionOptions);

const allGuildMembers = await fetchAllGuildMembers();

setInterval(async () => {
  console.log("GETTING");
  await redis.set("discordGuildMembers", allGuildMembers);
}, 5000);
