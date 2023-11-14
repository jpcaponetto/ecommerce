import http from "http";
import init from "./class/socket.js";

import app from "./index.js";
import { initMongoDB } from "./database/mongodb.js";

const PORT = 3000;
await initMongoDB();
const server = http.createServer(app);

init(server);
server.listen(PORT, () => {
  console.log(`Server is runnig on port http://localhots:${PORT}`);
});
