import express from 'express';
import connectDB from './db/dbConn.js';
import wasteCollectionRoutes from './routes/wasteCollectionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';


const app = express();

app.use(express.json());
dotenv.db();
connectDB();

app.use('/api/waste-collection', wasteCollectionRoutes);
app.use('/api/users', userRoutes);


// Add other route usages...

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
