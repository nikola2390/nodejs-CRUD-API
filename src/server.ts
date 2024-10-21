import http from "node:http";
import { configDotenv } from "dotenv";
import { v4 as uuidv4, validate as validateUuidv4 } from "uuid";

import {
  User,
  StatusCode,
  HttpMethod,
  userNotExistsMessage,
  invalidUserIdMessage,
} from "./constants";

configDotenv();

const users: User[] = [
  {
    id: uuidv4(),
    username: "John",
    age: 33,
    hobbies: ["football"],
  },
  {
    id: uuidv4(),
    username: "Johns",
    age: 22,
    hobbies: [],
  },
  {
    id: uuidv4(),
    username: "Jo",
    age: 34,
    hobbies: ["one"],
  },
  {
    id: uuidv4(),
    username: "Joh",
    age: 51,
    hobbies: ["hobby1", "hobby2"],
  },
];

const parseURL = (url: string): string[] => {
  return url.split("/");
};

const server = http.createServer((req, res) => {
  const userID: string | undefined = parseURL(req.url!)[3];

  switch (req.method) {
    case HttpMethod.GET:
      if (req.url === "/api/users") {
        res.write(JSON.stringify(users));
        res.statusCode = StatusCode.OK;
      }

      if (req.url!.startsWith("/api/users") && validateUuidv4(userID)) {
        const user: User | undefined = users.find((user) => user.id === userID);

        if (user) {
          res.statusCode = StatusCode.OK;
          res.write(JSON.stringify(user));
        } else {
          res.statusCode = StatusCode.NOT_FOUND;
          res.write(JSON.stringify({ message: userNotExistsMessage }));
        }
      }

      if (req.url!.startsWith("/api/users") && !validateUuidv4(userID)) {
        res.statusCode = StatusCode.BAD_REQUEST;
        res.write(JSON.stringify({ message: invalidUserIdMessage }));
      }
      break;

    default:
      break;
  }

  res.end();
});

server.listen(process.env.PORT);
