import http from "http";
import { app } from "./app";
import { setupSocketServer } from "./sockets/socketServer";

const PORT = 3000;

const httpServer = http.createServer(app);

setupSocketServer(httpServer);

httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});