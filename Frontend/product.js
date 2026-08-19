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
        const galleryDiv = document.createElement('div');
        const infoDiv = document.createElement('div');
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');

        console.log();
        
        if(!prod.image_url){
            img.style.display = "none";
        } else {
            img.src = `${API_URL}${prod.image_url}`;
        }

        div.classList.add("product-sell");
        button.classList.add("button-sell")
        price.classList.add('price');
        description.classList.add('info-product');
        stock.classList.add('info-product');
        galleryDiv.classList.add('gallery-div');
        infoDiv.classList.add('info-div');
        

        button.addEventListener('click', () => {
        const productoCarrito = carrito.find(p => p.id === prod.id)
        if(productoCarrito){
            productoCarrito.cantidad++;
        }else {
            carrito.push({...prod, cantidad:1})
        }
            mostrarToast();
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
        

        galleryDiv.appendChild(img);
        infoDiv.appendChild(name);
        infoDiv.appendChild(price);
        infoDiv.appendChild(description);
        infoDiv.appendChild(stock);
        infoDiv.appendChild(button);
        div.appendChild(galleryDiv);
        div.appendChild(infoDiv);
        container.appendChild(div);
    }

const toast = document.getElementById('toast');

function mostrarToast(){
    toast.classList.add('show');

    setTimeout( () => {
        toast.classList.remove('show');
    },3000)
}

obtenerProductoId();