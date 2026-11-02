const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Veb-saytdan so'rov qabul qilish uchun

const BOT_TOKEN = '9070135329:AAGePTSiRBMBz9l3dQNgan6qU66pPsDgpME';
const MY_CHAT_ID = '6649277063';

app.post('/send-message', async (req, res) => {
    const { text } = req.body;

    // 1000 belgidan oshmasligini tekshirish
    if (!text || text.length > 1000) {
        return res.status(400).json({ success: false, message: "Matn 1 dan 1000 belgigacha bo'lishi kerak!" });
    }

    try {
        // Telegram API yordamida Direct'ga yuborish
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: MY_CHAT_ID,
            text: `📝 Saytdan yangi xabar:\n\n${text}`
        });

        res.json({ success: true, message: "Xabar muvaffaqiyatli yuborildi!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Serverda xatolik yuz berdi." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
