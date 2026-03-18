const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

// CONFIGURACIÓN CORREGIDA
const TELEGRAM_TOKEN = "8638502261:AAE67xlF2-rRkHOFR8GRP_uK3N9556pYl2U";
// Aquí estaba el error, le faltaba el "100" y otros números del ID de supergrupo
const TELEGRAM_CHAT_ID = "-1003897298905"; 

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
        // Esto te ayudará a ver el error real en los logs de Render
        console.error("❌ Error en Telegram:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Error al enviar a Telegram" });
    }
});

app.get('/', (req, res) => res.send('Servidor de Notificaciones Activo 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
