export type DiscordGuildMember = {
  avatar: string;
  communication_disabled_until: string;
  flags: number;
  is_pending: boolean;
  joined_at: Date;
  nick: string | null;
  pending: boolean;
  premium_since: boolean;
  roles: [];
  user: {
    id: string;
    username: string;
    avatar: string | null;
    avatar_decoration: string | null;
    discriminator: string;
    public_flags: number;
  };
  mute: boolean;
  deaf: boolean;
};
