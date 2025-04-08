import Property from "../models/property.js";
import fs from "fs";
import PropertyFeature from "../models/propertyFeatures.js";
import PropertyType from "../models/propertyType.js";
import PropertyLabel from "../models/propertyLabel.js";
import PropertyStatus from "../models/propertyStatus.js";
import { Country } from "../models/location.js";
import { State } from "../models/location.js";
import { City } from "../models/location.js";

export const getProperties = async (req, res) => {
  try {
    let { search = "", page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, parseInt(limit) || 10);

    const filter = search.trim()
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
          ],
        }
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
      featureImage: property.featureImage
        ? convertToBase64(property.featureImage)
        : null,
      imageGallery: property.imageGallery
        ? property.imageGallery.map((img) => convertToBase64(img))
        : [],
    }));

    const total = await Property.countDocuments(filter);

    const featureName = await Promise.all(
      formattedProperties.map(async (property) => {
        const feature = await PropertyFeature.find({
          _id: { $in: property.features },
        });
        return feature.map((feature) => feature.title);
      })
    );

    // put featureName in the formattedProperties
    formattedProperties.forEach((property, index) => {
      property.featureName = featureName[index];
    });

    const typeName = await Promise.all(
      formattedProperties.map(async (property) => {
        const type = await PropertyType.find({ _id: { $in: property.type } });

        return type.map((type) => type.title);
      })
    );

    formattedProperties.forEach((property, index) => {
      property.typeName = typeName[index];
    });

    const labelName = await Promise.all(
      formattedProperties.map(async (property) => {
        const label = await PropertyLabel.find({
          _id: { $in: property.label },
        });
        return label.map((label) => label.title);
      })
    );

    formattedProperties.forEach((property, index) => {
      property.labelName = labelName[index];
    });

    const statusName = await Promise.all(
      formattedProperties.map(async (property) => {
        const status = await PropertyStatus.findById(property.status);
        return status.title;
      })
    );

    formattedProperties.forEach((property, index) => {
      property.status = statusName[index];
    });

    const countryName = await Promise.all(
      formattedProperties.map(async (property) => {
        const country = await Country.findById(property.country);
        return country.name;
      })
    );

    formattedProperties.forEach((property, index) => {
      property.countryName = countryName[index];
    });

    const stateName = await Promise.all(
      formattedProperties.map(async (property) => {
        const state = await State.findById(property.state);
        return state.name;
      })
    );

    formattedProperties.forEach((property, index) => {
      property.stateName = stateName[index];
    });

    const cityName = await Promise.all(
      formattedProperties.map(async (property) => {
        const city = await City.findById(property.city);
        return city.name;
      })
    );

    formattedProperties.forEach((property, index) => {
      property.cityName = cityName[index];
    });

    res.json({
      success: true,
      formattedProperties,
      total,
      hasMore: total > page * limit,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const property = await Property.findOne({ slug })
      .populate("user", "name email")
      .populate("agent", "name phone");

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Convert images to Base64
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

    const featureImageBase64 = property.featureImage
      ? convertToBase64(property.featureImage)
      : null;
    const imageGalleryBase64 = property.imageGallery
      ? property.imageGallery.map((img) => convertToBase64(img))
      : [];

    // Fetch related data from respective models
    const featureDocs = await PropertyFeature.find({
      _id: { $in: property.features },
    });
    const typeDocs = await PropertyType.find({ _id: { $in: property.type } });
    const labelDocs = await PropertyLabel.find({
      _id: { $in: property.label },
    });
    const statusDoc = property.status
      ? await PropertyStatus.findById(property.status)
      : null;
    const countryDoc = property.country
      ? await Country.findById(property.country)
      : null;
    const stateDoc = property.state
      ? await State.findById(property.state)
      : null;
    const cityDoc = property.city ? await City.findById(property.city) : null;

    // Extract required fields
    const featureName = featureDocs.map((feature) => feature.title);
    const labelName = labelDocs.map((label) => label.title);
    const typeName = typeDocs.map((type) => type.title);
    const status = statusDoc?.name || "";
    const countryName = countryDoc?.name || "";
    const stateName = stateDoc?.name || "";
    const cityName = cityDoc?.name || "";

    res.json({
      success: true,
      property: {
        ...property._doc,
        featureImage: featureImageBase64,
        imageGallery: imageGalleryBase64,
        featureName,
        labelName,
        typeName,
        status,
        countryName,
        stateName,
        cityName,
      },
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
