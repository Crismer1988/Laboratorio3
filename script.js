document.getElementById('request-button').addEventListener('click', async () => {
    const pageName = document.getElementById('page-name').value;
    const method = document.getElementById('http-method').value;

    try {
        let response;
        
        // Solicitud según el método utilizado
        if (method === 'GET') {
            response = await fetch(`http://localhost:3000/request-page?name=${pageName}`);
        } else {
            response = await fetch(`http://localhost:3000/request-page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: pageName })
            });
        }
        console.log(pageName, response)

        if (response.ok) {
            const content = await response.text();
            document.getElementById('content-frame').srcdoc = content;
        } else {
            console.error('Error en la respuesta del servidor');
            alert('Hubo un problema al obtener el archivo. Revisa el nombre del archivo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

