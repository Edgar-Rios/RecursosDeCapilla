document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('votingModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('voteForm');

    // Función para abrir el modal
    openBtn.onclick = function() {
        modal.style.display = 'block';
    }

    // Función para cerrar el modal usando el botón X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Función para cerrar el modal al hacer clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Manejar el envío del formulario (aquí harías la lógica real del voto)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que la página se recargue

        const voterName = document.getElementById('voterName').value;
        
        if (voterName.trim() !== "") {
            alert(`¡Gracias por votar, ${voterName}! Tu voto ha sido registrado.`);
            
            // Aquí iría la llamada AJAX o fetch para enviar el voto al servidor
            
            modal.style.display = 'none'; // Cierra el modal
            form.reset(); // Limpia el formulario
        }
    });
});