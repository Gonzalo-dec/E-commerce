const container = document.getElementById('datos-carrito');

async function renderizarCarrito(){
    container.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    for (const producto of carrito) {
        const response = await fetch(`http://localhost:3000/products/${producto.id}`);
        const data = await response.json()
        const stock = data.data[0].stock;
 
        const div = document.createElement('div');   
        const quantitySelector = document.createElement('div'); 
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const description = document.createElement('p');
        const decrease = document.createElement('button');
        const add = document.createElement('button');
        const quantity = document.createElement('input');
        const eliminar = document.createElement('button');

        function updateButtons(){
        decrease.disabled = producto.cantidad <= 1;
        add.disabled = producto.cantidad >= stock;
}
updateButtons();

        quantity.type = 'number';
        quantity.min = '1';
        quantity.max = stock;
        quantity.value = producto.cantidad;

        div.classList.add('cart');
        quantitySelector.classList.add('quantity-selector');
        eliminar.classList.add('btn-delete');
        price.classList.add('price');
        description.classList.add('description')

        name.textContent = `${producto.name}`;
        price.textContent = `Price: $${producto.price}`;
        description.textContent = `${producto.description}`;
        eliminar.textContent = `X`;
        decrease.textContent = '-';
        add.textContent = '+';


        div.appendChild(name);
        div.appendChild(description);
        quantitySelector.appendChild(quantity);
        quantitySelector.appendChild(add);
        quantitySelector.appendChild(decrease);
        div.appendChild(price);
        div.appendChild(eliminar);
        div.appendChild(quantitySelector)
        container.appendChild(div);

        if(producto.description == null){
            description.textContent = '';
        };

        quantity.addEventListener('input', (e) => {
            const result = e.target.value;
            const resultNum = parseInt(result, 10);
            if(resultNum > stock ){
                quantity.value = producto.cantidad;
                return alert('No hay suficientes existencias');
            } else if(resultNum == 0 || resultNum < 0 || isNaN(resultNum)){
                return e.target.value = producto.cantidad;
            }
            producto.cantidad = resultNum;
            localStorage.setItem('carrito', JSON.stringify(carrito));

            updateButtons()
        })

        add.addEventListener('click', async () => {
            if(producto.cantidad >= stock){
                return alert('No hay suficientes unidades');
            } 
            producto.cantidad++;
            quantity.value = producto.cantidad;
            localStorage.setItem('carrito', JSON.stringify(carrito));

            updateButtons()
        });


        decrease.addEventListener('click', async () => {
            if(producto.cantidad > 1){
                producto.cantidad--;
                quantity.value = producto.cantidad;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                updateButtons()
            }
        })
        


        eliminar.addEventListener('click', async () => {
            const cart = JSON.parse(localStorage.getItem('carrito')) || [];
            const newCart = cart.filter(item => item.id !== producto.id);
            localStorage.setItem('carrito', JSON.stringify(newCart));
            await renderizarCarrito();
        })
    }
    const button = document.createElement('button');
    button.textContent = 'Comprar'
    button.classList.add('btn-buy');
    container.appendChild(button);
    if(carrito.length == 0){
            document.querySelector('.btn-buy').style.display = "none";
        }
    button.addEventListener('click', async () => {
        const token = localStorage.getItem("token");
        const cart = JSON.parse(localStorage.getItem("carrito")) || [];
        if(cart.length === 0){
            alert('No hay ningun producto en el carrito');
            return;
        }
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                items: cart
            })
        });
        const data = await response.json();
        if(!response.ok){
            alert(data.message);
            return;
        } 
        
        alert("Compra realizada con éxito")
        localStorage.removeItem("carrito");
        window.location.replace('home.html');

    })
}
renderizarCarrito()