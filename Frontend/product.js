let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function obtenerProductoId(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    mostrarProductoId(data.data);
}

function mostrarProductoId(producto){
    const container = document.getElementById('conteiner-product-venta');
    const button = document.getElementById('agregar-carrito');
    producto.forEach(prod => {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');
        

        button.addEventListener('click', () => {
            console.log( prod)
            const productoCarrito = carrito.find(p => p.id === prod.id)
        if(productoCarrito){
            productoCarrito.cantidad++
        }else{
            carrito.push({...prod, cantidad:1})
        }
            localStorage.setItem('carrito', JSON.stringify(carrito));
        })

        name.textContent = prod.name;
        price.textContent = `Price: $${prod.price}`;
        description.textContent = prod.description;
        stock.textContent = prod.stock;
        
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        container.appendChild(div);
    })
}


obtenerProductoId();