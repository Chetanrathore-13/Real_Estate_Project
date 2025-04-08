import ProjectType from "../models/projectType.js";
import fs from "fs"

export const addProjectType = async(req,res)=>{
    console.log("main bhi chl rha hu")
   try {
      const {title , description} = req.body
      if(!title || !description){
        res.status(402).json({message:"Title or Description is required"})
      }
      const propertyType = new ProjectType({title,description,icon:req.file.path})
      if(!propertyType){
        res.status(500).json({message:"Database error"})
      }
      await propertyType.save()
      res.status(200).json({message:"Property Type has been added Successfuly "})
   } catch (error) {
     res.status(500).json({message:"error in adding property",error})
   }
}

export const getProjectType = async (req,res) => {
    try {
        const propetyTypess = await ProjectType.find();
        if(!propetyTypess){
            res.status(500).json({message:"Database error"})
        } 
        
       const propertyTypewithicon = propetyTypess.map((Type)=>{
        let imageBase64 = null;
        try {
            if(fs.existsSync(Type.icon)){
                imageBase64 = fs.readFileSync(Type.icon,{encoding:"base64"});
            }else{
              console.warn(`Image not found at path: ${Type.icon}`);
            }
        return {...Type.toObject(), imageBase64: `data:image/jpeg;base64,${imageBase64}`}
        } catch (error) {
            console.error(`Error reading image file: ${error.message}`);
        }
       })
       
       res.status(200).json(propertyTypewithicon)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProjectType = async (req, res) => {
    console.log("Update function triggered");

    try {
        const { slug } = req.params;
        const updatedData = req.body;

        // Find the existing Type
        const existingType = await ProjectType.findOne({ slug });

        if (!existingType) {
            return res.status(404).json({ message: "Type not found" });
        }

        // If a new icon is uploaded, delete the old one
        if (req.file) {
            if (existingType.icon) {
                fs.unlinkSync(existingType.icon);
            }
            updatedData.icon = req.file.path; // Assign new icon path
        }

        // Update the Type in the database
        const updatedPropertyType = await ProjectType.findOneAndUpdate(
            { slug },
            updatedData,
            { new: true }
        );

        if (!updatedPropertyType) {
            return res.status(500).json({ message: "Database update error" });
        }

        res.json(updatedPropertyType);

    } catch (error) {
        console.error("Error updating Type:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




export const deleteProjectType = async (req, res) => {
    console.log("hey I am here");
    try {
        const { slug } = req.params;
        console.log("Slug:", slug);

        const deletedProjectType = await ProjectType.findOneAndDelete({ slug });

        if (!deletedProjectType) {
            return res.status(404).json({ message: "Type not found" });
        }

        console.log("Deleted Type:", deletedProjectType);

        if (deletedProjectType.icon) {
            fs.unlinkSync(deletedProjectType.icon);
        }

        res.status(200).json({ message: "Project Type has been deleted successfully" });

    } catch (error) {
        console.error("Error deleting Type:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
