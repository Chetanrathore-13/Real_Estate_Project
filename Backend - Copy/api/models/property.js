import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    featureImage: { type: String, required: true },
    imageGallery: [String],
    videoLink: { type: String },
    reraNumber: { type: String },
    regularPrice: { type: Number },
    sellingPrice: { type: Number },
    pricePrefix: { type: String },
    pricePostfix: { type: String},
    areaSize: { type: Number},
    areaSizePostfix: { type: String},
    totalRooms: { type: Number },
    totalBedRooms: { type: Number },
    garage_area: { type: Number },
    garage_parking: { type: String},
    garage_parking_size:{ type: Number },
    yearBuilt: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    city:{type: mongoose.Schema.Types.ObjectId,ref:"City"},
    address:{type:String},
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: "PropertyFeature" }],
    label: [{ type: mongoose.Schema.Types.ObjectId, ref: "PropertyLabel" }],
    status: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyStatus" },
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "PropertyType" }],
    showInFeature: { type: Boolean, default: false },
    showInProjectsOnly: { type: String, default: false },
    slug: { type: String, unique: true }
}, { timestamps: true });


// Middleware to generate slug before saving
propertySchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

export default mongoose.model("Property", propertySchema);
