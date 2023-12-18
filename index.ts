import fastify, { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import dotenv from "dotenv";
import * as https from "https";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import * as dns from "dns";

dotenv.config();

const server = fastify();
const prisma = new PrismaClient();

const main = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body, headers, method, query, url } = request;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const targetUrl = `${process.env.TARGET_URL}${url}`;
  const requestHeaders = {
    ...headers,
    host: process.env.TARGET_URL?.replace(/(^\w+:|^)\/\//, ""),
  };

  if (
    !!(await dns.promises.resolve("google.com")) &&
    process.env.OFFLINE !== "true"
  ) {
    await axios(targetUrl, {
      headers: requestHeaders,
      method,
      data: body,
      params: query,
      httpsAgent: agent,
    })
      .then(async (response) => {
        const parsedHeaders = Object.entries(response.headers).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value === null ? undefined : value,
          }),
          {},
        );

        const cachedRequest = await prisma.request.findFirst({
          orderBy: [
            {
              updated_at: "desc",
            },
          ],
          where: {
            method,
            request_url: targetUrl,
            request_payload: JSON.stringify(body),
          },
        });

        if (cachedRequest) {
          await prisma.request.update({
            where: {
              id: cachedRequest.id,
            },
            data: {
              request_headers: JSON.stringify(requestHeaders),
              response_status: response.status,
              response_body: JSON.stringify(response.data),
              response_headers: JSON.stringify(parsedHeaders),
            },
          });
        } else {
          await prisma.request.create({
            data: {
              method,
              request_url: targetUrl,
              request_headers: JSON.stringify(requestHeaders),
              request_payload: JSON.stringify(body),
              response_status: response.status,
              response_body: JSON.stringify(response.data),
              response_headers: JSON.stringify(parsedHeaders),
              updated_at: new Date(),
            },
          });
        }

        reply.headers({ ...parsedHeaders });
        reply.status(response.status);
        reply.send(response.data);
      })
      .catch((error) => {
        console.error(error);
        reply.status(error.response.status);
        reply.send(error.response.data);
      });
  } else {
    const cachedRequest = await prisma.request.findFirst({
      orderBy: [
        {
          updated_at: "desc",
        },
      ],
      where: {
        method,
        request_url: targetUrl,
        request_payload: JSON.stringify(body),
      },
    });

    if (cachedRequest) {
      reply.headers(JSON.parse(cachedRequest.response_headers));
      reply.status(cachedRequest.response_status);
      reply.send(JSON.parse(cachedRequest.response_body));
    } else {
      reply.status(404);
      reply.send({
        message: "No cached response found",
      });
    }
  }
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
