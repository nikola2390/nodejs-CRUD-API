import { UserData } from "./constants";

export const parseURL = (url: string): string[] => {
  return url.split("/");
};

export const isUserDataValid = (userData: UserData): boolean => {
  return (
    typeof userData.username === "string" &&
    typeof userData.age === "number" &&
    Array.isArray(userData.hobbies)
  );
};
