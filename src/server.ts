import http from "node:http";
import { configDotenv } from "dotenv";
import { v4 as uuidv4, validate as validateUuidv4 } from "uuid";

import {
  User,
  StatusCode,
  HttpMethod,
  userNotExistsMessage,
  invalidUserIdMessage,
  notContainRequiredFieldsMessage,
  UserData,
} from "./constants";

import { parseURL, isUserDataValid } from "./utils";

configDotenv();

let users: User[] = [];

const server = http.createServer(async (req, res) => {
  const userID: string | undefined = parseURL(req.url!)[3];

  switch (req.method) {
    case HttpMethod.GET:
      if (req.url === "/api/users") {
        res.statusCode = StatusCode.OK;
        res.write(JSON.stringify(users));
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

      if (
        req.url!.startsWith("/api/users") &&
        !validateUuidv4(userID) &&
        req.url !== "/api/users"
      ) {
        res.statusCode = StatusCode.BAD_REQUEST;
        res.write(JSON.stringify({ message: invalidUserIdMessage }));
      }
      res.end();
      break;
    case HttpMethod.POST:
      if (req.url === "/api/users") {
        let data = "";
        let userData: UserData;
        let newUser: User;

        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          userData = JSON.parse(data);

          if (isUserDataValid(userData)) {
            newUser = { id: uuidv4(), ...userData };

            users.push(newUser);

            res.statusCode = StatusCode.CREATED;
            res.write(JSON.stringify(newUser));
          } else {
            res.statusCode = StatusCode.BAD_REQUEST;
            res.write(
              JSON.stringify({ message: notContainRequiredFieldsMessage })
            );
          }

          res.end();
        });
      }
      break;
    case HttpMethod.DELETE:
      if (validateUuidv4(userID)) {
        const deletedUser: User | undefined = users.find(
          (user) => user.id === userID
        );

        if (deletedUser) {
          res.statusCode = StatusCode.NO_CONTENT;
          users = users.filter((user: User) => user.id !== deletedUser.id);
        } else {
          res.statusCode = StatusCode.NOT_FOUND;
          res.write(JSON.stringify({ message: userNotExistsMessage }));
        }
      } else {
        res.statusCode = StatusCode.BAD_REQUEST;
        res.write(JSON.stringify({ message: invalidUserIdMessage }));
      }

      res.end();
      break;
    default:
      break;
  }
});

server.listen(process.env.PORT);
