const form = document.getElementById('register-form')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    const userData = {
        name,
        email, 
        password
    }

    const response = await fetch(`${API_URL}/auth/register`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    const data = await response.json();
    
    if(response.ok === true) {
        window.location.replace("home.html")
    }else{
        console.log(data.message)
    }

})