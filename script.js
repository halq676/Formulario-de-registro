document.getElementById('miFormulario').addEventListener('submit', function(e) {
    const btn = document.getElementById('btnEnviar');
    btn.innerText = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Nota: El formulario se enviará automáticamente a FormSubmit
    console.log("Formulario enviado correctamente");
});