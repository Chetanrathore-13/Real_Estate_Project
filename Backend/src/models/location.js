import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Country Schema
const countrySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }
}, { timestamps: true });

// State Schema
const stateSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true }
}, { timestamps: true });

// City Schema
const citySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stateId: { type: Schema.Types.ObjectId, ref: "State", required: true },
  countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true }
}, { timestamps: true });

// Export all models
const Country = model("Country", countrySchema);
const State = model("State", stateSchema);
const City = model("City", citySchema);

export { Country, State, City };
