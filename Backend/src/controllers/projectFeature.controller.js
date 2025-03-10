import ProjectFeature from "../models/projectFeature.js";
import fs from "fs"

export const addProjectFeature = async(req,res)=>{
   try {
      const {title , description} = req.body
      if(!title || !description){
        res.status(402).json({message:"Title or Description is required"})
      }
      const propertyFeature = new ProjectFeature({title,description,icon:req.file.path})
      if(!propertyFeature){
        res.status(500).json({message:"Database error"})
      }
      await propertyFeature.save()
      res.status(200).json({message:"Property Feature has been added Successfuly "})
   } catch (error) {
     res.status(500).json({message:"error in adding property",error})
   }
}

export const getProjectFeature = async (req,res) => {
    try {
        const propetyFeaturess = await ProjectFeature.find();
        if(!propetyFeaturess){
            res.status(500).json({message:"Database error"})
        } 
        
       const propertyFeaturewithicon = propetyFeaturess.map((Feature)=>{
        let imageBase64 = null;
        try {
            if(fs.existsSync(Feature.icon)){
                imageBase64 = fs.readFileSync(Feature.icon,{encoding:"base64"});
            }else{
              console.warn(`Image not found at path: ${Feature.icon}`);
            }
        return {...Feature.toObject(), imageBase64: `data:image/jpeg;base64,${imageBase64}`}
        } catch (error) {
            console.error(`Error reading image file: ${error.message}`);
        }
       })
       
       res.status(200).json(propertyFeaturewithicon)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProjectFeature = async (req, res) => {
    console.log("Update function triggered");

    try {
        const { slug } = req.params;
        const updatedData = req.body;

        // Find the existing feature
        const existingFeature = await ProjectFeature.findOne({ slug });

        if (!existingFeature) {
            return res.status(404).json({ message: "Feature not found" });
        }

        // If a new icon is uploaded, delete the old one
        if (req.file) {
            if (existingFeature.icon) {
                fs.unlinkSync(existingFeature.icon);
            }
            updatedData.icon = req.file.path; // Assign new icon path
        }

        // Update the feature in the database
        const updatedPropertyFeature = await ProjectFeature.findOneAndUpdate(
            { slug },
            updatedData,
            { new: true }
        );

        if (!updatedPropertyFeature) {
            return res.status(500).json({ message: "Database update error" });
        }

        res.json(updatedPropertyFeature);

    } catch (error) {
        console.error("Error updating feature:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




export const deleteProjectFeature = async (req, res) => {
    console.log("hey I am here");
    try {
        const { slug } = req.params;
        console.log("Slug:", slug);

        const deletedProjectFeature = await ProjectFeature.findOneAndDelete({ slug });

        if (!deletedProjectFeature) {
            return res.status(404).json({ message: "Feature not found" });
        }

        console.log("Deleted Feature:", deletedProjectFeature);

        if (deletedProjectFeature.icon) {
            fs.unlinkSync(deletedProjectFeature.icon);
        }

        res.status(200).json({ message: "Project Feature has been deleted successfully" });

    } catch (error) {
        console.error("Error deleting feature:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
