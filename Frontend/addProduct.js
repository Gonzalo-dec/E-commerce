const button = document.getElementById('submit')

async function obtenerCategories(){
    const response = await fetch('http://localhost:3000/categories');
    const data = await response.json();
    categoriesSelect(data.data)
}

function categoriesSelect (categories){
    const select = document.getElementById('categories');
    categories.forEach(categorie => {
        const option = document.createElement('option');
        option.textContent = categorie.name;
        option.value = categorie.id;

        select.appendChild(option)
    })
}

obtenerCategories();

button.addEventListener('click', async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const stock = document.getElementById('stock').value;
    const category_id = document.getElementById('categories').value;
    const token = localStorage.getItem("token");

    if(!name || !price || !description || !stock || !category_id){
        return alert('Debes completar los campos obligatorios');
    }

    const userData = {
        name,
        price,
        description,
        stock,
        category_id
    }
    const response = await fetch('http://localhost:3000/products', {
        method: "POST",
        headers: {
            authorization: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
     
     document.querySelector('form').reset()
})