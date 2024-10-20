import http from "node:http";
import { configDotenv } from "dotenv";

configDotenv();

const users: User[] = [
  {
    id: "544444",
    username: "John",
    age: 33,
    hobbies: ["football"],
  },
  {
    id: "54444",
    username: "Johns",
    age: 22,
    hobbies: [],
  },
  {
    id: "5444",
    username: "Jo",
    age: 34,
    hobbies: ["one"],
  },
  {
    id: "544",
    username: "Joh",
    age: 51,
    hobbies: ["hobby1", "hobby2"],
  },
];

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

enum StatusCode {
  OK = 200,
}

enum HttpMethod {
  GET = "GET",
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case HttpMethod.GET:
      if (req.url === "/api/users") {
        res.write(JSON.stringify(users));
        res.statusCode = StatusCode.OK;
      }
      break;

    default:
      break;
  }

  res.end();
});

server.listen(process.env.PORT);
