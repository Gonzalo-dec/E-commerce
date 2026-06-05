const carrito = JSON.parse(localStorage.getItem('carrito',)) || [];

function renderizarCarrito(){
    carrito.forEach(producto => {
        const container = document.getElementById('datos-carrito');
        const name = document.createElement('h3');
        const price = document.createElement('p');
        const quantity = document.createElement('p');
    })
}