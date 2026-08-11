const container = document.querySelector('.container-orders');

async function getOrders() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/orders`, {
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
        const divHeader = document.createElement('div');
        const title = document.createElement('h2');
        const total = document.createElement('p');
        const dateBuy = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const date = new Date(order.created_at); 
        const formattedDate = date.toLocaleDateString();
        const itemsContainer = document.createElement('div');
        itemsContainer.style.display = "none";

        if(!order.items[0].image_url){
            img.style.display = "none";
        } else {
            img.src = `${API_URL}${order.items[0].image_url}`;
        }

        div.classList.add('order-card');
        divHeader.classList.add('order-header');
        total.classList.add('order-total');
        img.classList.add('img-order');
        button.classList.add('btn-details');
        itemsContainer.classList.add('container-folding');


        title.textContent = `Orden #${order.id}`;
        total.textContent = `Total: $${order.total}`;
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

        divHeader.appendChild(title);
        divHeader.appendChild(total);
        div.appendChild(divHeader);
        div.appendChild(img);
        div.appendChild(dateBuy);
        div.appendChild(button);
        div.appendChild(itemsContainer);
        container.appendChild(div);
    })
}
function showItems(items, container){
    container.innerHTML = "";
    items.forEach(item => {
    const divItem = document.createElement('div');
    const nameProduct = document.createElement('span');
    const quanBuyer = document.createElement('span');

    divItem.classList.add('item-line');

    nameProduct.textContent = `${item.name}`;
    quanBuyer.textContent = `Quantity: ${item.quantity} $${item.unit_price}`
    divItem.appendChild(nameProduct);
    divItem.appendChild(quanBuyer);
    container.appendChild(divItem);
    })
}
    
getOrders()