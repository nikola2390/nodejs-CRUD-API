export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum HttpMethod {
  GET = "GET",
}

export const userNotExistsMessage = "The requested user does not exist";

export const invalidUserIdMessage = "User ID is invalid";
