import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");          
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from 'mongoose';
const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("successfuly connected to database");
        
    } catch (error) {
        console.error("Error connecting to db",error);
        process.exit(1);
        
        
    }
}
export default connectDB