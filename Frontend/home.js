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
        const response = await fetch('http://localhost:3000/categories');
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
    const response = await fetch('http://localhost:3000/products', {
        headers: {
            authorization: token
        }
    });
    const data = await response.json();
    mostrarProductos(data.data)
    }catch(err){
        console.error('Error getting products', err);
    }
}

function mostrarProductos(productos){
    const container = document.getElementById('products-container');
    productos.forEach(producto => {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');

        div.classList.add('product-card');
        div.addEventListener('click', () => {
    window.location.href = `product.html?id=${producto.id}`;
});

        name.textContent = producto.name;
        price.textContent = `Precio: $${producto.price}`;
        description.textContent = `Description: ${producto.description}`;
        stock.textContent = `Stock: ${producto.stock}`;
        
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        container.appendChild(div);
    })
}

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
