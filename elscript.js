const carrito = [];

function agregarAlCarrito(nombre, idInput, precio) {
  const cantidad = parseInt(document.getElementById(idInput).value);
  if (cantidad > 0) {
    const existente = carrito.find(item => item.producto === nombre);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ producto: nombre, cantidad, precio });
    }

    guardarCarrito();
    actualizarCarrito();
  }
}



function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    li.innerHTML = `
      <div class="flex-grow-1">
        <strong>${item.producto}</strong><br>
        $${item.precio} c/u<br>
        <input type="number" class="form-control form-control-sm mt-1" value="${item.cantidad}" min="1" onchange="editarCantidad(${index}, this.value)">
      </div>
      <div class="text-end ms-3">
        <strong>$${subtotal}</strong><br>
        <button class="btn btn-sm btn-outline-danger mt-1" onclick="eliminarItem(${index})">🗑️</button>
      </div>
    `;

    lista.appendChild(li);
  });

  document.getElementById("cantidadTotal").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const totalContainer = document.getElementById("totalAPagar");
  totalContainer.textContent = `Total a pagar: $${total}`;

  const botonPagar = document.querySelector(".pagar");
  if (botonPagar) {
    botonPagar.style.display = carrito.length > 0 ? "block" : "none";
  }
}



function editarCantidad(index, nuevaCantidad) {
  const cantidad = parseInt(nuevaCantidad);
  if (!isNaN(cantidad) && cantidad > 0) {
    carrito[index].cantidad = cantidad;
    guardarCarrito();
    actualizarCarrito();
  }
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
  carrito.length = 0;
  guardarCarrito();
  actualizarCarrito();
}

function pagar() {
  alert("Gracias por tu compra 💎");
  vaciarCarrito();
}

window.addEventListener("load", () => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    const datos = JSON.parse(guardado);
    datos.forEach(p => carrito.push(p));
    actualizarCarrito();
  }
});




