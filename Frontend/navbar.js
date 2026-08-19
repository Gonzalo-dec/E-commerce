verifyToken();
renderNavbar();
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
    <h1 id="logo">E-commerce</h1>

    <div class= "nav-right">
 
<a href= "carrito.html">
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
</a>

    <div class="profile-menu">
        <button id="profile-btn">
        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        </button>

        <div id="profile-dropdown">

    <div class="profile-header">

        <div class="profile-info">
            <strong id="profile-name"></strong>
        </div>

    </div>

    <a href="orders.html">My purchases</a>
    <a href="sales.html">My Sales</a>
    <a href="addProduct.html" id="a-upload">Upload Product</a>

    <button id="session-out">Log Out</button>

</div>

</div>
        
</div>
</nav>
`
const profileName = document.getElementById('profile-name');
const name = localStorage.getItem('name');
profileName.textContent = `¡Welcome ${name}!`;

const profileBtn = document.getElementById('profile-btn');
const profileDropdown = document.getElementById('profile-dropdown');

profileBtn.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
})
}

function configureLogout() {
const sessionOut = document.getElementById('session-out');
sessionOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.replace('login.html');
})
}