import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

// Country Schema
const countrySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true }
  },
  { timestamps: true } // ✅ Correct placement of options
);

// State Schema
const stateSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true },
    countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true }
  },
  { timestamps: true }
);

// City Schema
const citySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true },
    stateId: { type: Schema.Types.ObjectId, ref: "State", required: true },
    countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true }
  },
  { timestamps: true }
);

// ✅ Middleware to generate slug before saving
countrySchema.pre("save", function (next) {
  console.log("I am running in location manager");
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

stateSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

citySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Export all models
const Country = model("Country", countrySchema);
const State = model("State", stateSchema);
const City = model("City", citySchema);

export { Country, State, City };
