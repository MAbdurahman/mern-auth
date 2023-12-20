import mongoose from 'mongoose';
import colors from 'colors';

colors.enable();
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB connected to ${conn.connection.host} with mongoose`.cyan.italic);
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
    }
};
export default connectDatabase;