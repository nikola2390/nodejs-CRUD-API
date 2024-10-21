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
  pathNotExistMessage,
  internalServerErrorMessage,
} from "./constants";

import { parseURL, isUserDataValid } from "./utils";

configDotenv();

let users: User[] = [];

const server = http.createServer(async (req, res) => {
  try {
    const userID: string | undefined = parseURL(req.url!)[3];

    if (!req.url!.startsWith("/api/users") || parseURL(req.url!).length > 4) {
      res.statusCode = StatusCode.NOT_FOUND;
      res.write(JSON.stringify({ message: pathNotExistMessage }));
      res.end();
      return;
    }

    switch (req.method) {
      case HttpMethod.GET:
        if (req.url === "/api/users") {
          res.statusCode = StatusCode.OK;
          res.write(JSON.stringify(users));
        }

        if (req.url!.startsWith("/api/users") && validateUuidv4(userID)) {
          const user: User | undefined = users.find(
            (user) => user.id === userID
          );

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
        if (req.url!.startsWith("/api/users")) {
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
        }
        break;
      case HttpMethod.PUT:
        if (req.url!.startsWith("/api/users")) {
          let data = "";
          let userData: UserData;
          let updatedUser: User | undefined = users.find(
            (user) => user.id === userID
          );

          if (updatedUser) {
            const index = users.indexOf(updatedUser);

            req.on("data", (chunk) => {
              data += chunk;
            });
            req.on("end", () => {
              userData = JSON.parse(data);

              if (isUserDataValid(userData)) {
                updatedUser = { id: updatedUser!.id, ...userData };
                users[index] = updatedUser;

                res.statusCode = StatusCode.OK;
                res.write(JSON.stringify(updatedUser));
              } else {
                res.statusCode = StatusCode.BAD_REQUEST;
                res.write(
                  JSON.stringify({ message: notContainRequiredFieldsMessage })
                );
              }

              res.end();
            });
          } else if (!validateUuidv4(userID)) {
            res.statusCode = StatusCode.BAD_REQUEST;
            res.write(JSON.stringify({ message: invalidUserIdMessage }));
            res.end();
          } else {
            res.statusCode = StatusCode.NOT_FOUND;
            res.write(JSON.stringify({ message: userNotExistsMessage }));
            res.end();
          }
        }
        break;
      default:
        break;
    }
  } catch {
    res.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    res.write(JSON.stringify({ message: internalServerErrorMessage }));
    res.end();
  }
});

server.listen(process.env.PORT);
