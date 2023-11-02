/* eslint-disable @typescript-eslint/no-explicit-any */
export const username = (user: any): string => {
  return user?.username || user?.fullName || user?.firstName || "";
};
