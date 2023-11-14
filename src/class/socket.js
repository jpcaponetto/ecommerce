import { Server } from "socket.io";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();

let products = [];
let socketServer;
let GsocketClient;

const init = (httpServer) => {
  socketServer = new Server(httpServer);

  socketServer.on("connection", async (socketClient) => {
    GsocketClient = socketClient;
    console.log("SC", socketClient.id);
    products = await productManager.getProducts();
    socketClient.on("delete", async (id) => {
      try {
        await productManager.delete(id);
        socketClient.emit("delete-product", id);
      } catch (error) {}
    });
    socketClient.on("new-product", async (data) => {
      try {
        console.log(data);
        await productManager.create(data);
        socketClient.emit("created", data.code);
      } catch (error) {}
    });
    fnToEmit("products", products);
  });
};

export const fnToEmit = (event, data) => {
  GsocketClient.emit(event, data);
};

export default init;
