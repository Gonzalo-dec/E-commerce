let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const returnHome = document.querySelector('.return-home');

returnHome.addEventListener('click', () => {
    window.location.replace('home.html')
})

async function obtenerProductoId(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    mostrarProductoId(data.data);
}

function mostrarProductoId(producto){
    const container = document.getElementById('conteiner-product-venta');
    const button = document.createElement('button');
    producto.forEach(prod => {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');

        div.classList.add("product-sell");
        button.classList.add("button-sell")

        button.addEventListener('click', () => {
        const productoCarrito = carrito.find(p => p.id === prod.id)
        console.log(productoCarrito);
        if(productoCarrito){
            productoCarrito.cantidad++;
            alert("Producto sumado con éxito");
        }else {
            carrito.push({...prod, cantidad:1})
            alert("Producto agregado con éxito al carrito");
        }
            localStorage.setItem('carrito', JSON.stringify(carrito));
        })

        name.textContent = prod.name;
        price.textContent = `Price: $${prod.price}`;
        description.textContent = `Description: ${prod.description}`;
        stock.textContent = `Existencias: ${prod.stock}`;
        button.textContent = "Agregar";
        
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        div.appendChild(button);
        container.appendChild(div);
    })
}


obtenerProductoId();