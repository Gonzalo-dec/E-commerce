const button = document.getElementById('submit')

async function obtenerCategories(){
    const response = await fetch(`${API_URL}/categories`);
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
    const fileImg = document.getElementById('image').files[0];
    const category_id = document.getElementById('categories').value;
    const token = localStorage.getItem("token");

    if(!name || !price || !description || !stock || !category_id){
        return alert('Debes completar los campos obligatorios');
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('image', fileImg);
    formData.append('category_id', category_id);

    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            authorization: token,
        },
        body: formData
    });
    const data = await response.json();
     
     document.querySelector('form').reset()
})