const container = document.getElementById('datos-carrito');
const returnHome = document.querySelector('.return-home');

returnHome.addEventListener('click', () => {
    window.location.replace('home.html');
})

function renderizarCarrito(){
    container.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(producto => {
        const div = document.createElement('div');    
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const quantity = document.createElement('p');
        const eliminar = document.createElement('button');
        const disminuir = document.createElement('button');

        div.classList.add('cart');

        name.textContent = `${producto.name}`;
        price.textContent = `Price: $${producto.price}`;
        quantity.textContent = `Quantity: ${producto.cantidad}`;
        eliminar.textContent = `X`;
        disminuir.textContent = `Delete`;


        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(quantity);
        div.appendChild(eliminar);
        div.appendChild(disminuir);
        container.appendChild(div);

        disminuir.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('carrito')) || [];
            const productFound = cart.find(item => item.id === producto.id);
            if(productFound){
                productFound.cantidad--;
            } if(productFound.cantidad <= 0){
                const newCart = cart.filter(item => item.id !== producto.id);
                localStorage.setItem('carrito', JSON.stringify(newCart));
            }else{
                localStorage.setItem('carrito', JSON.stringify(cart));
            }
            renderizarCarrito();
        })

        eliminar.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('carrito')) || [];
            const newCart = cart.filter(item => item.id !== producto.id);
            localStorage.setItem('carrito', JSON.stringify(newCart));
            renderizarCarrito();
        })

    })
    
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