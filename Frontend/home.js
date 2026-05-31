function verifyToken(){
const token = localStorage.getItem('token')
if(token === null){
    window.location.replace('login.html')
}
}
verifyToken();

const sessionOut = document.getElementById('session-out');
sessionOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.replace('login.html');
})
function welcomeUser(){
const h1 = document.getElementById('welcome');
const name = localStorage.getItem('name');
if(!name) {
    return h1.textContent = `¡Welcome User!`
}
h1.textContent = `¡Welcome ${name}!`
}
welcomeUser();
