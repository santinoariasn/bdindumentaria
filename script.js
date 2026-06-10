// NAVBAR
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
        navbar.classList.add("chico")
    } else {
        navbar.classList.remove("chico")
    }
})

// PRODUCTOS
const productos = {
    saco: {
        nombre: "Saco BD",
        precio: 21000,
        descripcion: "Saco de alta calidad, ideal para cualquier ocasión. Disponible en todos los talles.",
        fotos: ["img/saco/saco1.jpg", "img/saco/saco2.jpg", "img/saco/saco3.jpg", "img/saco/saco4.jpg"]
    },
    sueter: {
        nombre: "Sueter Negro Trenzado BD",
        precio: 25000,
        descripcion: "Sueter cómodo y elegante. Disponible en todos los talles.",
        fotos: ["img/sueter/sueter1.jpg", "img/sueter/sueter2.jpg"]
    },
    chenil: {
        nombre: "Sueter Azul Trenzado BD",
        precio: 24000,
        descripcion: "Sueter de chenil, abrigado y moderno. Disponible en todos los talles.",
        fotos: ["img/chenil/chenil1.jpg"]
    }
}

// CARRITO
let carrito = []

// MODAL PRODUCTO
const modal = document.getElementById("modal-producto")
const cerrarModal = document.querySelector(".cerrar-modal")
const fotoPrincipal = document.getElementById("foto-principal")
const miniaturas = document.querySelector(".miniaturas")
const modalTitulo = document.querySelector(".modal-info h2")
const modalPrecio = document.querySelector(".modal-precio")
const modalDescripcion = document.querySelector(".modal-descripcion")

function abrirProducto(id) {
    const p = productos[id]
    modalTitulo.textContent = p.nombre
    modalPrecio.textContent = "$" + p.precio.toLocaleString()
    modalDescripcion.textContent = p.descripcion
    fotoPrincipal.src = p.fotos[0]

    miniaturas.innerHTML = ""
    p.fotos.forEach(function(foto) {
        const img = document.createElement("img")
        img.src = foto
        img.onclick = function() { cambiarFoto(img) }
        miniaturas.appendChild(img)
    })

    // Botón agregar al carrito
    const btnAgregar = document.querySelector(".btn-agregar-carrito")
    btnAgregar.onclick = function() {
        agregarAlCarrito(id)
    }

    modal.classList.add("activo")
}

function cambiarFoto(img) {
    fotoPrincipal.src = img.src
}

cerrarModal.addEventListener("click", function() {
    modal.classList.remove("activo")
})

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.classList.remove("activo")
    }
})

// CARRITO
function agregarAlCarrito(id) {
    const p = productos[id]
    const existente = carrito.find(function(item) { return item.id === id })
    if (existente) {
        existente.cantidad++
    } else {
        carrito.push({ id: id, nombre: p.nombre, precio: p.precio, cantidad: 1 })
    }
    actualizarContador()
    modal.classList.remove("activo")
}

function actualizarContador() {
    const total = carrito.reduce(function(sum, item) { return sum + item.cantidad }, 0)
    document.getElementById("carrito-count").textContent = total
}

const modalCarrito = document.getElementById("modal-carrito")
const cerrarCarrito = document.querySelector(".cerrar-carrito")

function abrirCarrito() {
    const itemsDiv = document.getElementById("carrito-items")
    const totalDiv = document.getElementById("carrito-total")
    itemsDiv.innerHTML = ""

    if (carrito.length === 0) {
        itemsDiv.innerHTML = "<p>El carrito está vacío.</p>"
        totalDiv.textContent = ""
    } else {
        let total = 0
        carrito.forEach(function(item) {
            total += item.precio * item.cantidad
            const div = document.createElement("div")
            div.classList.add("carrito-item")
            div.innerHTML = `
                <span>${item.nombre} x${item.cantidad}</span>
                <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
                <button onclick="eliminarDelCarrito('${item.id}')">✕</button>
            `
            itemsDiv.appendChild(div)
        })
        totalDiv.textContent = "Total: $" + total.toLocaleString()
    }

    modalCarrito.classList.add("activo")
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(function(item) { return item.id !== id })
    actualizarContador()
    abrirCarrito()
}

cerrarCarrito.addEventListener("click", function() {
    modalCarrito.classList.remove("activo")
})

modalCarrito.addEventListener("click", function(e) {
    if (e.target === modalCarrito) {
        modalCarrito.classList.remove("activo")
    }
})

document.getElementById("btn-whatsapp-carrito").addEventListener("click", function() {
    if (carrito.length === 0) return
    let mensaje = "Hola! Me gustaría consultar por los siguientes productos:%0A"
    let total = 0
    carrito.forEach(function(item) {
        mensaje += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}%0A`
        total += item.precio * item.cantidad
    })
    mensaje += `Total: $${total.toLocaleString()}`
    window.open("https://wa.me/549XXXXXXXXXX?text=" + mensaje, "_blank")
})