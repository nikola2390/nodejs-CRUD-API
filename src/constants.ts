export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum StatusCode {
  OK = 200,
}

export enum HttpMethod {
  GET = "GET",
}
