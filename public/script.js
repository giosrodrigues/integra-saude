document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerProfessionalForm = document.getElementById('registerProfessionalForm');

    const menuBar = document.getElementById('menuBar');
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');

    menuBar.addEventListener('click', function() {
        if (sidebar.style.width === '250px') {
            sidebar.style.width = '0';
            main.classList.remove('expanded');
        } else {
            sidebar.style.width = '250px'; // Ajuste conforme necessário
            main.classList.add('expanded');
        }
    });
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

               
                if (response.ok) {
                    const result = await response.json();
                    console.log('Cadastro realizado com sucesso!');
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = result.redirectUrl;
                } else {
                    alert(result);
                    console.log('Erro ao realizar o cadastro.');
                    alert('Erro ao realizar o cadastro.');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                
                if (response.ok) {
                    const result = await response.json();
                    console.log('Login bem-sucedido!');
                    alert('Login bem-sucedido!');
                    window.location.href = result.redirectUrl;
                    // Redirecionar para a página inicial ou dashboard
                } else {
                    const errorText = await response.text();
                    console.log('E-mail ou senha incorretos.');
                    alert('E-mail ou senha incorretos.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao fazer login. Tente novamente.');
            }
        });
    }


if (registerProfessionalForm) {
    registerProfessionalForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(registerProfessionalForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/register_professional', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                const result = await response.json();
                    console.log('Profissional registrado com sucesso!');
                    alert('Profissional registrado com sucesso!');
                    window.location.href = result.redirectUrl;
            } else {
                const errorText = await response.text();
                console.log('Erro:', errorText);
                alert('Erro ao registrar profissional.');
            }
        } catch (error) {
            console.error('Erro:', error);
            
        }
    });
}
});