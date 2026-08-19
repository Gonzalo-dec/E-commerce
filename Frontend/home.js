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
    container.innerHTML = "";
    container.innerHTML = `<h2 id="title-categories"> Categories </h2>`
    categorias.forEach(categoria => {
        const div = document.createElement('div');
        div.classList.add('cat-card');
        div.innerHTML = `
        <label> 
        <input type="checkbox" value="${categoria.id}" class="filter" onchange="filterCategories()"> 
        ${categoria.name}
        </label>
        `;

        const name = document.createElement('a');
        name.href = `category.html?id=${categoria.id}`;
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
        const separator = document.createElement('div');
        const imageContainer = document.createElement('div');
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const button = document.createElement('button');
        const img = document.createElement('img');

        div.classList.add('product-card');
        separator.classList.add('separator');
        imageContainer.classList.add('image-container');
        button.textContent = 'Comprar';
        button.classList.add('buy-btn');
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
        
        imageContainer.appendChild(img);
        div.appendChild(imageContainer)
        separator.appendChild(name);
        separator.appendChild(price);
        div.appendChild(separator)
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

function filterCategories(){
    const checkboxes = document.querySelectorAll('.filter');
     
    let categoriesSelected = [];
    checkboxes.forEach(check => {
        if(check.checked){
            categoriesSelected.push(Number(check.value));
        }
    })
    if(categoriesSelected.length === 0){
        mostrarProductos(productosGlobal);
        return;
    }
    const productsFilter = productosGlobal.filter(p => {
        return categoriesSelected.includes(p.category_id);
    })
    mostrarProductos(productsFilter);
}