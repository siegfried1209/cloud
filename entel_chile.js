 // Evento para enviar el formulario de VLAN
 document.getElementById('vlanform_echile').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario de forma tradicional

    const vlan_chile = document.getElementById('vlan_echile').value;
    const int_chile = document.getElementById('int_echile').value;

    const data = {
        vlan_id_chile: vlan_chile,
        interface_chile: int_chile
    };

    fetch('https://192.168.1.39:3000/configure-vlan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('responseMessage').innerText = `Respuesta del servidor: ${data.message}`;
    })
    .catch(error => {
        document.getElementById('responseMessage').innerText = `Error: ${error.message}`;
    });
});

// Función para obtener los datos MAC desde el servidor y mostrarlos en la tabla
function obtenerDatosMac() {
    fetch('https://192.168.1.39:3000/datos-mac-echile')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos MAC');
            }
            return response.json();
        })
        .then(datos => {
            const tbody = document.getElementById('datosMacTable');
            tbody.innerHTML = '';
            datos.forEach(dato => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${dato.id}</td>
                    <td>${dato.vlan}</td>
                    <td>${dato.mac_address}</td>
                    <td>${dato.port}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

obtenerDatosMac();