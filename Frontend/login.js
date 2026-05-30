const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email,
        password
    }
try{
    const response = await fetch("http://localhost:3000/auth/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userData)
    })
    const data = await response.json()

    if(response.ok){
        const token = data.token;
        localStorage.setItem('token', token)
        window.location.replace('home.html')
    }else{
        alert('Credenciales incorrectas');
    }
}catch(err){
    console.error('Falló la conexión al servidor', err)
}
})

