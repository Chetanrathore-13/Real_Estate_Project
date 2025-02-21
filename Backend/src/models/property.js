import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    featuredImage: { type: String, required: true },
    imageGallery: [String],
    videoLink: { type: String, required: true },
    reraNumber: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    pricePrefix: { type: String, required: true },
    pricePostfix: { type: String, required: true },
    areaSize: { type: Number, required: true },
    areaSizePostfix: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    totalBedRooms: { type: Number, required: true },
    garage_parking: { type: String, required: true },
    garage_parking_size:{ type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    city:{type: mongoose.Schema.Types.ObjectId,ref:"City"},
    address:{type:String,required:true},
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: "PropertyFeature" }],
    label: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyLabel" },
    status: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyStatus" },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyType" },
    showInFeature: { type: Boolean, default: false },
    showInProjectsOnly: { type: String, default: "No" },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });


// Middleware to generate slug before saving
propertySchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

export default mongoose.model("Property", propertySchema);
