const Mail = require('../models/Mail.js');

exports.send = async (req, res) => {

    try {
        const {from, to, subject, text} = req.body;
        const { status } = 'processing';

        const mail = new Mail({
            from,
            to,
            subject,
            text,
            status
        });

        await mail.save();

        res.status(201).json({ message: 'Dados para envio de email armazenados!' });
    
    }catch (err){
        res.status(500).json({ error: err.message });
    }

};