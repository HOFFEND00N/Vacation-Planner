export const isCellSelectable = ({ userId, currentUserId }: { userId: string; currentUserId: string }) => {
  return userId === currentUserId;
};
