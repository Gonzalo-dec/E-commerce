const container = document.getElementById('container-sales');

async function getSales () {
    try{
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/orders/sales`, {
            headers: {
                authorization: token
            }
        });
        const data = await response.json();
        showSales(data.data)
    }catch(err){
        console.error('Error al obtener ventas', err);
    }
}

function showSales(sales){
    sales.forEach(sale => {
        const div = document.createElement('div');
        const divHeader = document.createElement('div');
        const nOrder = document.createElement('h2');
        const total = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const itemsContainer = document.createElement('div');
        itemsContainer.style.display = "none";
        const date = document.createElement('p')
        const dateSale = new Date(sale.created_at);
        const formattedDate = dateSale.toLocaleDateString();

        if(!sale.items[0].image_url){
            img.style.display = "none";
        } else{
            img.src = `${API_URL}${sale.items[0].image_url}`
        }

        div.classList.add('order-card');
        divHeader.classList.add('order-header');
        total.classList.add('order-total');
        img.classList.add('img-order');
        button.classList.add('btn-details');
        itemsContainer.classList.add('container-folding');

        nOrder.textContent = `Id Orden: ${sale.id}`;
        total.textContent = `$${sale.total}`;
        button.textContent = 'View Details';
        date.textContent = `Date: ${formattedDate}`;

        button.addEventListener('click', () => {
            if(itemsContainer.style.display === "none"){
                itemsContainer.style.display = "block";
                button.textContent = "Hide details";
                showItems(sale.items, itemsContainer);
            } else {
                itemsContainer.style.display = "none";
                button.textContent = "View Details";
            }
    });
    

        divHeader.appendChild(nOrder);
        divHeader.appendChild(total);
        div.appendChild(divHeader);
        div.appendChild(img);
        div.appendChild(date);
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

    nameProduct.textContent = `Product: ${item.product_name} `;
    quanBuyer.textContent = `Quantity: ${item.quantity} - Buyer Name: ${item.buyer_name}`
    divItem.appendChild(nameProduct);
    divItem.appendChild(quanBuyer);
    container.appendChild(divItem);
    })
}
getSales();