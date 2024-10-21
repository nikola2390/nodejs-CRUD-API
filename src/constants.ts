export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export const userNotExistsMessage = "The requested user does not exist";

export const invalidUserIdMessage = "User ID is invalid";

export const notContainRequiredFieldsMessage =
  "Request does not contain required fields";
