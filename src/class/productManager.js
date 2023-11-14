import Product from "./product.js";
import FSConfig from "../dao/fs/fsConfig.js";

const fsConfig = new FSConfig("./products.json");

class ProductManager {
  constructor() {
    this.products = [];
  }

  checkCode(code) {
    const productCode = this.products.find((product) => product.code === code);
    if (productCode) {
      return true;
    }
  }
  async getId(id) {
    this.products = await fsConfig.read();
    const idIndex = this.products.findIndex((product) => product.id === id);
    return idIndex;
  }

  async getProducts() {
    this.products = await fsConfig.read();
    if (this.products) {
      return this.products;
    } else {
      return null;
    }
  }
  async getProductsById(id) {
    this.products = await fsConfig.read();
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return {
        msg: "Product not found",
        status: 404,
      };
    }
  }

  async create(body) {
    this.products = await fsConfig.read();
    const { title, code, category, description, stock, price } = body;

    const product = new Product(
      title,
      code,
      category,
      description,
      stock,
      price
    );

    if (!this.checkCode(code)) {
      this.products.push(product);
      await fsConfig.write(this.products);
      return product;
    } else {
      return 0;
    }
  }

  async update(id, body) {
    this.products = await fsConfig.read(); // leer lista de prodc
    const idIndex = await this.getId(id); //
    const clonProduct = this.product[idIndex];
    if (idIndex === -1) {
      return null;
    }
    const product = {
      id,
      ...clonProduct,
      ...body,
    };
    this.products[idIndex] = product;
    await fsConfig.write(this.products);
    return product;
  }

  async delete(id) {
    this.products = await fsConfig.read();
    const idIndex = await this.getId(id);

    if (idIndex === -1) {
      return null;
    } else {
      this.products.splice(idIndex, 1);
      await fsConfig.write(this.products);
      return 1;
    }
  }
}

export default ProductManager;
