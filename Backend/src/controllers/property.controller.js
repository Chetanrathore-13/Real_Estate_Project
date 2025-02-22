import Property from "../models/property.js";


export const getProperties = async(req,res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        
        const filter = search
          ? { $or: [ 
              { name: { $regex: search, $options: "i" } }, 
              { slug: { $regex: search, $options: "i" } } 
            ] }
          : {};
    
        const properties = await Property.find(filter)
          .limit(parseInt(limit))
          .skip((parseInt(page) - 1) * parseInt(limit));
    
        const total = await Property.countDocuments(filter);
    
        res.json({
          success: true,
          properties,
          total,
          hasMore: total > parseInt(page) * parseInt(limit),
        });
      } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
      }
}
export const addProperty = async (req, res) => {
    try {
        const {name, description, featuredImage, imageGallery, videoLink, reraNumber, regularPrice, sellingPrice, pricePrefix,pricePostfix,areaSize,areaSizePostfix,totalRooms,totalBedRooms,garage_parking,garage_parking_size,agent,country,state,city,address,features,label,status,type,showInFeature,showInProjectsOnly} = req.body 

        const property = new Property({name,description,featuredImage,imageGallery,videoLink,reraNumber,regularPrice,sellingPrice,pricePrefix,pricePostfix,areaSize,areaSizePostfix,totalBedRooms,totalRooms,garage_parking,garage_parking_size,agent,country,state,city,address,features,label,status,type,showInFeature,showInProjectsOnly})
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