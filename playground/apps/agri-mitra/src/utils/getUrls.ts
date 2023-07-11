const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getLikeMessageUrl = (msgId: string) =>
  `${baseUrl}/feedback/query/like/${msgId}`;

export const getDislikeMessageUrl = (msgId: string) =>
  `${baseUrl}/feedback/query/dislike/${msgId}`;

export const getResetMessageLikeUrl = (msgId: string) =>
  `${baseUrl}/feedback/query/removelike/${msgId}`;

export const getReactionUrl = ({
  msgId,
  reaction,
}: {
  msgId: string;
  reaction: 0 | 1 | -1;
}) => {
  if (reaction === -1) return getDislikeMessageUrl(msgId);
  if (reaction === 1) return getLikeMessageUrl(msgId);
  return getResetMessageLikeUrl(msgId);
};
