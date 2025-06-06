const carrito = [];

function agregarAlCarrito(id) {
  const cantidad = parseInt(document.getElementById("cant" + id).value);

  if (cantidad > 0) {
    const producto = "Pulsera " + id;

    const existente = carrito.find(item => item.producto === producto);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ producto, cantidad });
    }

    actualizarCarrito();
    guardarCarrito();
  }
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.producto} - Cantidad: ${item.cantidad}`;
    lista.appendChild(li);
  });
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


window.addEventListener("load", () => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    const datos = JSON.parse(guardado);
    datos.forEach(p => carrito.push(p));
    actualizarCarrito();
  }
});
