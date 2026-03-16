const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permite que tu index.html externo llame a este servidor

// Configuración de Telegram
const TELEGRAM_TOKEN = "8638502261:AAE67xlF2-rRkHOFR8GRP_uK3N9556pYl2U";
const TELEGRAM_CHAT_ID = "-3715942226";

// Ruta para recibir las notificaciones
app.post('/notify', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, error: "Mensaje vacío" });
    }

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log("✅ Notificación enviada a Telegram");
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Error en Telegram:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Error al enviar a Telegram" });
    }
});

// Ruta simple para verificar que el servidor está vivo
app.get('/', (req, res) => res.send('Servidor de Notificaciones Activo 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));