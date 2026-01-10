// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha-app' // Gerar em: myaccount.google.com/apppasswords
    }
});

app.post('/api/contato', async (req, res) => {
    try {
        const { nome, email, telefone, assunto, mensagem, data } = req.body;
        
        await transporter.sendMail({
            from: 'seu-email@gmail.com',
            to: 'seu-email@gmail.com',
            replyTo: email,
            subject: `Novo contato: ${assunto}`,
            html: `
                <h2>Novo Contato</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Data:</strong> ${data}</p>
                <h3>Mensagem:</h3>
                <p>${mensagem.replace(/\n/g, '<br>')}</p>
            `
        });
        
        res.json({ success: true, message: 'Email enviado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});