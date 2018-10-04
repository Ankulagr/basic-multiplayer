import * as express from "express";
import * as socketIo from "socket.io";
import { createServer } from "http";
import { attachControllers } from "@decorators/socket";
import { ShipGameController } from "./ShipGame/Controller";

class App {
  PORT: number | string;
  app;
  server;
  io: SocketIO.Server;

  constructor() {
    this.PORT = process.env.PORT || 8080;
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIo(this.server);

    this.configure();
    attachControllers(this.io, [ShipGameController]);

    this.server.listen(this.PORT, () => {
      console.log("Listen on " + this.PORT);
    });
  }

  private configure(): void {
    this.app.use(express.static(__dirname + "/../public"));
    this.app.get("/", (req, res) => {
      res.sendFile("index.html");
    });
  }
}

new App();
