async function obtenerProductos() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/DuvanAndrade/aurora_TP_Final_Js/main/js/productos.json");
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
                <p><i>$${producto.peso}</i></p>
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












