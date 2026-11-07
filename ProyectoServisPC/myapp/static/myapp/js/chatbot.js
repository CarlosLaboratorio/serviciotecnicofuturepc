document.addEventListener("DOMContentLoaded", function () {

    // URL de producción del Webhook de n8n
    const WEBHOOK_URL = "https://carlosanibal815-cuenta003.app.n8n.cloud/webhook/chat-reparaciones";

    // Elementos del chatbot
    const chatWindow = document.getElementById("chatbot-window");
    const toggleButton = document.getElementById("chatbot-toggle");
    const closeButton = document.getElementById("chatbot-close");

    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    // Identificador de sesión para Simple Memory
    let sessionId = sessionStorage.getItem("chatSessionId");

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("chatSessionId", sessionId);
    }

    // Abrir y cerrar el chat
    function abrirChat() {
        chatWindow.hidden = false;
        toggleButton.setAttribute("aria-expanded", "true");
        userInput.focus();
    }

    function cerrarChat() {
        chatWindow.hidden = true;
        toggleButton.setAttribute("aria-expanded", "false");
    }

    toggleButton.addEventListener("click", function () {
        if (chatWindow.hidden) {
            abrirChat();
        } else {
            cerrarChat();
        }
    });

    closeButton.addEventListener("click", cerrarChat);

    // Mostrar mensajes
    function mostrarMensaje(texto, tipo) {

        const mensaje = document.createElement("div");

        mensaje.classList.add("message");

        mensaje.classList.add(
            tipo === "usuario" ? "user-message" : "bot-message"
        );

        mensaje.textContent = texto;

        chatMessages.appendChild(mensaje);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enviar pregunta a n8n
    async function enviarPregunta(pregunta) {

        sendButton.disabled = true;
        userInput.disabled = true;

        const indicador = document.createElement("div");

        indicador.className = "typing";
        indicador.textContent = "El asistente está escribiendo...";

        chatMessages.appendChild(indicador);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {

            const respuestaHTTP = await fetch(WEBHOOK_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    pregunta: pregunta,
                    sessionId: sessionId
                })

            });

            if (!respuestaHTTP.ok) {
                throw new Error(
                    `Error HTTP: ${respuestaHTTP.status}`
                );
            }

            const datos = await respuestaHTTP.json();

            indicador.remove();

            const respuesta =
                datos.respuesta || datos.output;

            if (!respuesta) {
                throw new Error("La respuesta de n8n no contiene texto.");
            }

            mostrarMensaje(respuesta, "bot");

        } catch (error) {

            indicador.remove();

            console.error("Error del chatbot:", error);

            mostrarMensaje(
                "No pude conectarme con el asistente. Intentá nuevamente.",
                "bot"
            );

        } finally {

            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();

        }
    }

    // Evento de envío del formulario
    chatForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const pregunta = userInput.value.trim();

        if (!pregunta) {
            return;
        }

        mostrarMensaje(pregunta, "usuario");

        userInput.value = "";

        enviarPregunta(pregunta);

    });

});