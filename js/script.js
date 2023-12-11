async function obtenerProductos() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/DuvanAndrade/FilippaCafe/main/js/productos.json");
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

  

//NUESTROS PRODUCTOS
let btns_agregar = document.querySelectorAll('.agregar_producto');
const catalogo = document.querySelector('.box_productos');

async function cargarProductos(categoria) {       
    catalogo.innerHTML = ''; // SE LIMPIA EL CONTENIDO DEL CARRITO

    try {
        productos = await obtenerProductos()
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }

    productos.forEach(producto => {
        if (categoria === 'todos' || producto.categoria.nombre === categoria) {
            const div = document.createElement('div');
            
            //SE CREA UN DIV CON LOS ELEMNTOS DEL PRODCUTO A MOSTRAR
            div.innerHTML = `
            
            <article  id=${producto.id} class="box">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>${producto.peso} grs</i></p>
                <p><i>$${producto.precio}</i></p>
            </div>
            <div class="btn">
            <button class="agregar_producto" data-id=${producto.id} onclick = "agregarAlCarrito(${producto.id})"> <span>Agregar</span> </button>
            </div>
        
            `;
            catalogo.append(div);
        }
       
    });
}

document.getElementById('todos').addEventListener('click', () => cargarProductos('todos'));
document.getElementById('grano').addEventListener('click', () => cargarProductos('grano'));
document.getElementById('molido').addEventListener('click', () => cargarProductos('molido'));

cargarProductos('todos');


document.addEventListener("DOMContentLoaded", function(){
    const modalCart = document.getElementById("myModalCart");
    const btnCart = document.getElementById("myBtnCart");
    const span = document.getElementsByClassName("closeCart")[0];
    btnCart.onclick = function() {
    modalCart.style.display = "block";
    }
    span.onclick = function() {
    modalCart.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalCart) {
        modalCart.style.display = "none";
        }
    }

})

const productosEnCarrito = [];

function agregarAlCarrito(id){
    const productoAgregado = productos.find(producto => producto.id === id);
    productosEnCarrito.push(productoAgregado);
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
}

function eliminarProducto(id) {
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    const carritoActualizado = productosEnCarritoLS.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    limpiarCarrito();
    mostrarProcductosCarrito();
    
    const totalCarrito = calcularTotalCarrito();
    actualizarTotalCarrito(totalCarrito);
    
}

function limpiarCarrito() {
    const produCarrito = document.querySelector(".contenedor-carrito");
    produCarrito.innerHTML = ''; 
}
//FUNCION PARA CALCULAR EL TOTAL DE LOS PRODCUTOS AGREGADOS
function calcularTotalCarrito() {
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;

    if (productosEnCarritoLS && productosEnCarritoLS.length > 0) {
        total = productosEnCarritoLS.reduce((acumulador, producto) => {
            return acumulador + producto.precio;
        }, 0);
    }

    return total;
}
//FUNCION PARA ACTUALIZAR EL TOTAL DESPUES DE ELIMINAR UN ITEM
function actualizarTotalCarrito(total) {
    const divTotal = document.querySelector(".total_cart");
    divTotal.className = 'total_cart'
    divTotal.textContent = `Total: $${total}`;
}
function mostrarProcductosCarrito(){
    const produCarrito = document.querySelector(".contenedor-carrito");
    const titulo_cart = document.querySelector(".titulo_cart");
    const productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"));
    titulo_cart.textContent = "TU CARRITO";
    produCarrito.innerHTML = '';
    if(productosEnCarritoLS && productosEnCarritoLS.length > 0){
        productosEnCarritoLS.forEach((producto) =>{
            const div = document.createElement("div");
            div.className = 'grilla_productos_cart'
            div.innerHTML = `
            <article  id=${producto.id} class="box_cart">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>${producto.peso} grs</i></p>
                <p><i>$${producto.precio}</i></p>
            </div>
            <div class="btn">
            <button class="eliminar_producto" data-id=${producto.id} onclick = "eliminarProducto(${producto.id})"> <span>Eliminar</span> </button>
            </div>
            
            `;
            produCarrito.append(div);  
        });

        const totalCarrito = calcularTotalCarrito();
        actualizarTotalCarrito(totalCarrito);
        
    }else{
        titulo_cart.textContent = "CARRITO VACIO";
    }
}

mostrarProcductosCarrito()
















