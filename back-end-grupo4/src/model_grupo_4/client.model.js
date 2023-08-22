import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name:{ type:String, required: true},
  ruc: {type: Number, required: true, unique: true},
  direction: { type: String, required: true },
  type_client: { type: String, default: "I" },
  user: {type: mongoose.Types.ObjectId, ref: "User"},
  },
  {timestamps:true},
);

const Client = mongoose.model("Client", clientSchema);

export default Client;