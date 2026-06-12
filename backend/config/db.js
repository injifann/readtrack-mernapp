import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");           // Helpful for some networks
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";


export const connectDB = async ()=>{

    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("successfully connected to db")
    }
    catch(error)
    {
      console.log("error connecting to Db",error);
              process.exit(1);

    }
}
