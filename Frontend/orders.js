const container = document.querySelector('.container-orders');

async function getOrders() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/orders', {
            headers: {
                authorization: token
            }
        }); 
        const data = await response.json(); 
        showOrders(data.data)
    } catch (error) { 
        console.error("Error al obtener órdenes:", error);
    }
}

function showOrders(orders){
    orders.forEach(order => {
        const div = document.createElement('div');
        const title = document.createElement('h2');
        const total = document.createElement('p');
        const dateBuy = document.createElement('p');
        const button = document.createElement('button');
        const date = new Date(order.created_at); 
        const formattedDate = date.toLocaleDateString();
        const itemsContainer = document.createElement('div');
        itemsContainer.style.display = "none";


        title.textContent = `Orden #${order.id}`;
        total.textContent = `Total: ${order.total}`;
        dateBuy.textContent = `Date: ${formattedDate}`;
        button.textContent = `View Details`;

        button.addEventListener('click', () => {
            if(itemsContainer.style.display === "none"){
                itemsContainer.style.display = "block";
                button.textContent = "Hide details";

                showItems(order.items, itemsContainer);
            } else {
                itemsContainer.style.display = "none";
                button.textContent = "View Details";
            }
        });

        div.appendChild(title);
        div.appendChild(total);
        div.appendChild(dateBuy);
        div.appendChild(button);
        div.appendChild(itemsContainer);
        container.appendChild(div);
    })
}
function showItems(items, container){
    container.innerHTML = "";
    items.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item.name} - Quantity: ${item.quantity} $${item.unit_price}`;
    container.appendChild(p);
    })
}
    
getOrders()