import userModel from "../../../DB/model/user.model.js";
import wasteCollectionModel from "../../../DB/model/wasteCollection.moel.js";
import sendEmail, { createHtml } from "../../utils/email.js";

//1]================== Schedule Waste Collection  ========================
export const ScheduleWasteCollection = async (req, res, next) => {
  try {
    const { userId, type, weight, date, time, location } = req.body;

    console.log("Received data:", { userId, type, weight, date, time, location });

    const user = await userModel.findById(userId);
    if (!user) {
      const errorMessage = "User not found";
      console.error(errorMessage);
      return res.status(404).json({ error: errorMessage });
    }

    const appointment = new wasteCollectionModel({
      userId,
      type,
      weight,
      date,
      time,
      location,
      email: user.email,
    });

    await appointment.save();

    const html = createHtml(
      `Your appointment for ${type} waste collection has been scheduled on ${date} at ${time}.`
    );

    await sendEmail({
      to: user.email,
      subject: "Waste Collection Appointment Confirmation",
      html,
    });

    res.status(200).json({ message: "Appointment scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(400).json({ error: `Error scheduling appointment: ${error.message}` });
  }
};

//2]================= Get WasteTypes ==================
export const getWasteTypes = async (req, res, next) => {
  try {
    const wasteTypes = ["Plastic", "Glass", "Metal", "Organic", "Paper"];
    res.status(200).json(wasteTypes);
  } catch (error) {
    res.status(400).send(`Error fetching waste types: ${error.message}`);
  }
};
