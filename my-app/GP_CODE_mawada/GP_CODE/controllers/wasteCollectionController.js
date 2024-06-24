import WasteCollection from '../models/WasteCollection.js';
import sendEmail from '../utils/sendEmail.js';

export const scheduleWasteCollection = async (req, res) => {
    try {
        const { userId, wasteType, date, time, email } = req.body;

        const appointment = new WasteCollection({
            userId,
            wasteType,
            date,
            time,
        });
        
        await appointment.save();
        
        // Send confirmation email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Waste Collection Appointment Confirmation',
            text: `Your appointment for ${wasteType} waste collection has been scheduled on ${date} at ${time}.`,
        };

        await sendEmail(mailOptions);
        
        res.status(200).send('Appointment scheduled successfully and confirmation email sent');
    } catch (error) {
        res.status(400).send(`Error scheduling appointment: ${error.message}`);
    }
};

export const getWasteTypes = async (req, res) => {
    try {
        // Assuming you have a predefined list of waste types
        const wasteTypes = ['Plastic', 'Glass', 'Metal', 'Organic'];
        res.status(200).json(wasteTypes);
    } catch (error) {
        res.status(400).send(`Error fetching waste types: ${error.message}`);
    }
};
