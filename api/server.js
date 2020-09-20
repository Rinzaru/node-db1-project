const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();

const accountsRouter = require("./accounts/accounts");

server.use(express.json());
server.use("/api/accounts", accountsRouter);
server.use(accountsRouter);

module.exports = server;
