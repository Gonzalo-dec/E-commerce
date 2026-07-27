document.querySelector('.return-home').addEventListener('click', () => {
    window.location.replace('home.html');
})

async function obtenerProductosCategoria(){
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('id');

    const response = await fetch(`http://localhost:3000/categories/${categoryId}`)

    const data = await response.json();
    console.log(data);
    mostrarProductosCategoria(data.data)
}

function mostrarProductosCategoria(productos){
    const container = document.getElementById('container-productos-category');
    const nameCategory = document.getElementById('name-category');
    nameCategory.textContent = productos[0].category_name;
    
    productos.forEach(category => {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const stock = document.createElement('p');
        const button = document.createElement('button');

        div.classList.add('product-card')
        button.classList.add('btn')

        div.addEventListener('click', () => {
            window.location.href = `product.html?id=${category.id}`;
        })
        name.textContent = category.name;
        price.textContent = `Price: $${category.price}`;
        description.textContent = `Description: ${category.description}`;
        stock.textContent = `Stock: ${category.stock}`;
        button.textContent = `Go`;

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(description);
        div.appendChild(stock);
        div.appendChild(button);
        container.appendChild(div);
    })
}

obtenerProductosCategoria();
