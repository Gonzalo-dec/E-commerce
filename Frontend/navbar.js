verifyToken();
renderNavbar();
welcomeUser();
configureLogout();

function verifyToken(){
const token = localStorage.getItem('token')
if(token === null){
    window.location.replace('login.html')
}
}


function renderNavbar() {
document.getElementById('navbar').innerHTML = `
<nav>
    <h1 id= "welcome"></h1>

    <div class= "nav-right">
        <a href= "orders.html">My purchases</a>
        <a href= "addProduct.html">Upload Product</a>
        <a href= "carrito.html">Cart</a>
        <button id= "session-out">Log Out</button>
    </div>
</nav>
`;
}

function welcomeUser(){
const h1 = document.getElementById('welcome');
const name = localStorage.getItem('name');
if(!name) {
    return h1.textContent = `¡Welcome User!`
}
h1.textContent = `¡Welcome ${name}!`
}


function configureLogout() {
const sessionOut = document.getElementById('session-out');
sessionOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.replace('login.html');
})
}