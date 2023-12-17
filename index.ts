import fastify, { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import dotenv from "dotenv";
import * as https from "https";
import fastifyCors from "@fastify/cors";

dotenv.config();

const server = fastify();

const main = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body, headers, method, query, url } = request;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const targetUrl = `${process.env.TARGET_URL}${url}`;

  await axios(targetUrl, {
    headers: {
      ...headers,
      host: process.env.TARGET_URL?.replace(/(^\w+:|^)\/\//, ""),
    },
    method,
    data: body,
    params: query,
    httpsAgent: agent,
  })
    .then((response) => {
      const parsedHeaders = Object.entries(response.headers).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value === null ? undefined : value,
        }),
        {},
      );

      reply.headers({ ...parsedHeaders });
      reply.status(response.status);
      reply.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      reply.status(error.response.status);
      reply.send(error.response.data);
    });
};

server.get("*", main);
server.post("*", main);
server.put("*", main);
server.patch("*", main);
server.delete("*", main);

server.register(fastifyCors);

server.listen(
  { port: process.env.PORT ? parseInt(process.env.PORT) : 8080 },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is ON and listening on ${address}`);
  },
);
