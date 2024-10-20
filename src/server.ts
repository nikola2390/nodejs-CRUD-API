import http from "node:http";
import { configDotenv } from "dotenv";

configDotenv();

const server = http.createServer((req, res) => {});

server.listen(process.env.PORT);
