import Property from "../models/property.js";
import fs from "fs";


export const getProperties = async (req, res) => {
  try {
      let { search = "", page = 1, limit = 10 } = req.query;

      page = Math.max(1, parseInt(page) || 1);
      limit = Math.max(1, parseInt(limit) || 10);

      const filter = search.trim()
          ? { $or: [
              { name: { $regex: search, $options: "i" } },
              { slug: { $regex: search, $options: "i" } }
          ] }
          : {};

      const properties = await Property.find(filter)
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({ createdAt: -1 });

      // Convert image file to Base64
      const convertToBase64 = (filePath) => {
          try {
              if (fs.existsSync(filePath)) {
                  const imageBuffer = fs.readFileSync(filePath);
                  return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
              }
              return null;
          } catch (error) {
              console.error("Error converting image:", error);
              return null;
          }
      };

      // Process properties with Base64 images
      const formattedProperties = properties.map((property) => ({
          ...property._doc,
          featureImage: property.featureImage ? convertToBase64(property.featureImage) : null,
          imageGallery: property.imageGallery
              ? property.imageGallery.map((img) => convertToBase64(img))
              : [],
      }));

      const total = await Property.countDocuments(filter);

      res.json({
          success: true,
          properties: formattedProperties,
          total,
          hasMore: total > page * limit,
      });
  } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
export const addProperty = async (req, res) => {
    try {
        const {name, description, videoLink, reraNumber, regularPrice, sellingPrice, pricePrefix,pricePostfix,areaSize,areaSizePostfix,totalRooms,totalBedRooms,garage_parking,garage_parking_size,agent,country,state,city,address,features,label,status,type,showInFeature,showInProjectsOnly} = req.body 
        console.log("yha tak chl rha hu")
        console.log(req.files)
        const featureImage = req.files.featureImage[0].path
        console.log(featureImage)
        const imageGallery = req.files.imageGallery.map((file) => file.path)
       console.log(imageGallery)
        const property = new Property({name,description,featureImage,imageGallery,videoLink,reraNumber,regularPrice,sellingPrice,pricePrefix,pricePostfix,areaSize,areaSizePostfix,totalBedRooms,totalRooms,garage_parking,garage_parking_size,agent,country,state,city,address,features,label,status,type,showInFeature,showInProjectsOnly})
        await property.save();
        res.status(200).json(property)
    } catch (error) {
        res.status(500).json({message:"error in adding property",error})
    }
}

export const updateProperty = async (req,res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedProperty);    
    } catch (error) {
        res.status(500).json({message:"error in updating property",error})
    }
}

export const deleteProperty = async (req,res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id);
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPropertyBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const property = await Property.findOne({ slug })
            .populate("user", "name email")
            .populate("agent", "name phone")
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .populate("features", "name")
            .populate("label", "name")
            .populate("status", "name")
            .populate("type", "name");

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        // Function to convert an image file to a Base64 string
        const convertToBase64 = (filePath) => {
            try {
            
                if (fs.existsSync(filePath)) {
                    const image = fs.readFileSync(filePath);
                    return `data:image/jpeg;base64,${image.toString("base64")}`;
                } else {
                    return null;
                }
            } catch (error) {
                console.error("Error converting image to Base64:", error);
                return null;
            }
        };

        // Convert images to Base64
        const featureImageBase64 = property.featureImage ? convertToBase64(property.featureImage) : null;
        const imageGalleryBase64 = property.imageGallery
            ? property.imageGallery.map((img) => convertToBase64(img))
            : [];

     
        res.json({
            success: true,
            property: {
                ...property._doc,
                featureImage: featureImageBase64,
                imageGallery: imageGalleryBase64,
            },
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};