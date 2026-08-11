let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


async function obtenerProductoId(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    mostrarProductoId(data.data);
}

function mostrarProductoId(producto){
    const container = document.getElementById('conteiner-product-venta');
    const prod = producto[0];
    
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');

        if(!prod.image_url){
            img.style.display = "none";
        } else {
            img.src = `${API_URL}${prod.image_url}`;
        }

        div.classList.add("product-sell");
        button.classList.add("button-sell")
        

        button.addEventListener('click', () => {
        const productoCarrito = carrito.find(p => p.id === prod.id)
        if(productoCarrito){
            productoCarrito.cantidad++;
            alert("Producto sumado con éxito");
        }else {
            carrito.push({...prod, cantidad:1})
            alert("Producto agregado con éxito al carrito");
        }
            localStorage.setItem('carrito', JSON.stringify(carrito));
        })

        if(prod.stock === 0){
            button.disabled = true;
            button.textContent = 'Sin stock';
            div.classList.add('sin-stock');
            stock.classList.add('no-stock');
        }else {
            button.textContent = "Agregar";
        }

        name.textContent = prod.name;
        price.textContent = `Price: $${prod.price}`;
        description.textContent = `Description: ${prod.description}`;
        stock.textContent = `Existencias: ${prod.stock}`;
        

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        div.appendChild(button);
        container.appendChild(div);
    }


obtenerProductoId();