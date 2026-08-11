let productosGlobal = [];

function verifyToken(){
const token = localStorage.getItem('token')
if(token === null){
    window.location.replace('login.html')
}
}
verifyToken();

const sessionOut = document.getElementById('session-out');
sessionOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.replace('login.html');
})

async function obtenerCategorias(){
    try{
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        mostrarCategorias(data.data)
    }catch(err){
        console.error('Error getting categories', err);
    }
}

function mostrarCategorias(categorias){
    const container = document.getElementById('categories-container');
    categorias.forEach(categoria => {
        const div = document.createElement('div');
        const name = document.createElement('a');
        name.textContent = categoria.name;
        name.href = `category.html?id=${categoria.id}`;

        div.classList.add('cat-card');
        div.appendChild(name);
        container.appendChild(div)
    })
}

obtenerCategorias();

async function obtenerProductos(){
    try{
        const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products`, {
        headers: {
            authorization: token
        }
    });
    const data = await response.json();
    mostrarProductos(data.data)
    productosGlobal = data.data;
    const nav = document.querySelector('nav');
    const navRight = document.querySelector('.nav-right');
    nav.insertBefore(input, navRight);
    }catch(err){
        console.error('Error getting products', err);
    }
}

function mostrarProductos(productos){
    const container = document.getElementById('products-container');
    container.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');
        const button = document.createElement('button');
        const img = document.createElement('img');

        

        if(producto.stock === 0){
            button.disabled = true;
            button.textContent = 'Sin stock';
            div.classList.add('sin-stock');
        }else {
            button.textContent = 'Comprar';
        }

        div.classList.add('product-card');
        button.classList.add('buy-btn');
        description.classList.add('product-description');
        div.addEventListener('click', () => {
    window.location.href = `product.html?id=${producto.id}`;
});

        if(!producto.image_url){
            img.style.display = "none"
        }else {
            img.src = `${API_URL}${producto.image_url}`;
        }

        name.textContent = producto.name;
        price.textContent = `Precio: $${producto.price}`;
        description.textContent = `Description: ${producto.description}`;
        stock.textContent = `Stock: ${producto.stock}`;
        

        if(!producto.description){
            description.textContent = 'Sin Descripción';
        }

        
        
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        div.appendChild(button);
        container.appendChild(div);
    })
}

const input = document.createElement('input');
input.classList.add('input-search');
input.type = 'text';
input.placeholder = 'Buscar...';
input.addEventListener('input', (e) => {
    const textSearch = e.target.value;
    const result = textSearch.toLowerCase();
    const search = productosGlobal.filter(i => i.name.toLowerCase().includes(result));
    mostrarProductos(search);
})
obtenerProductos();

function welcomeUser(){
const h1 = document.getElementById('welcome');
const name = localStorage.getItem('name');
if(!name) {
    return h1.textContent = `¡Welcome User!`
}
h1.textContent = `¡Welcome ${name}!`
}
welcomeUser();
