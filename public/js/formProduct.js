const socket = io();

const form = document.getElementById("form-product");
const formDelete = document.getElementById("delete-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: e.target[0].value,
    code: e.target[1].value,
    category: e.target[2].value,
    description: e.target[3].value,
    stock: e.target[4].value,
    price: e.target[5].value,
  };
  socket.emit("new-product", product);
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[4].value = "";
  e.target[5].value = "";
});

formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = e.target[0].value;
  socket.emit("delete", id);
});

socket.on("created", (code) => {
  Swal.fire({
    icon: "success",
    title: "Product created",
    text: `Product created with code ${code}`,
    timer: 2700,
  });
});

socket.on("delete-product", (id) => {
  Swal.fire({
    icon: "success",
    title: "Product deleted",
    text: `Product with id ${id} deleted`,
    timer: 2700,
  });
});
