import {Country,City,State} from "../models/location.js";
import fs from "fs";


// Fetch all countries
export const getCountries = async (req, res) => {
 // send only latest update country
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    const countrywithicons = countries.map((country) => {
      let imageBase64 = null;
      try {
        if (fs.existsSync(country.icon)) {
          imageBase64 = fs.readFileSync(country.icon, { encoding: "base64" });
        }else{
          console.warn(`Image not found at path: ${country.icon}`);
        }
      } catch (error) {
        console.error(`Error reading image file: ${error.message}`);
      }
      return { ...country.toObject(), imageBase64: imageBase64 };
    })
    res.json(countrywithicons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new country
export const addCountry = async (req, res) => {
  console.log(req.body)
  console.log(req.file.filename)
  try {
    const { name, code, description } = req.body;
    const country = new Country({ name, code, icon: req.file.path, description });
    await country.save();
    res.status(201).json({message:"Country has been added Succefully",country});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a country
export const deleteCountry = async (req, res) => {

  // Add the for removing the icon also
  try {
    const { id } = req.params;
   const country = await Country.findByIdAndDelete(id);
   console.log(country.icon)
    if (fs.existsSync(country.icon)) {
            fs.unlink(country.icon, (err) => {
              if (err) {
                console.error("Error deleting image file:", err);
              }
            });
          }
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a country
export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all States
export const getStates = async (req, res) => {
    const countryId = req.params.countryId
     try {
    const states = await State.find({ countryId });
    
    const statewithicon = states.map((state) => {
      let imageBase64 = null;
      try {
        if (fs.existsSync(state.icon)) {
          imageBase64 = fs.readFileSync(state.icon, { encoding: "base64" });
        }else{
          console.warn(`Image not found at path: ${state.icon}`);
        }
      } catch (error) {
        console.error(`Error reading image file: ${error.message}`);
      }
      return { ...state.toObject(), imageBase64: imageBase64 };
    })

    res.json(statewithicon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

//Add a new state
export const addState = async (req, res) => { try {
    const { name, code,countryId,description } = req.body;
    const state = new State({ name, code, countryId, icon: req.file.path, description });
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };

// Delete a state
export const deleteState = async (req, res) => { try {
    const { id } = req.params;
    const state = await State.findByIdAndDelete(id);

    if (fs.existsSync(state.icon)) {
            fs.unlink(state.icon, (err) => {
              if (err) {
                console.error("Error deleting image file:", err);
              }
            });
          }

    res.json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };

// Update a state
export const updateState = async (req, res) => {  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedstate = await State.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedstate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };

  // Fetch all cities
export const getCities = async (req, res) => {  
    const stateId = req.params.stateId
    try {
    const Cities = await City.find({ stateId });
    const citywithicon = Cities.map((city) => {
      let imageBase64 = null;
      try {
        if (fs.existsSync(city.icon)) {
          imageBase64 = fs.readFileSync(city.icon, { encoding: "base64" });
        }else{
          console.warn(`Image not found at path: ${city.icon}`);
        }
      } catch (error) {
        console.error(`Error reading image file: ${error.message}`);
      }
      return { ...city.toObject(), imageBase64: imageBase64 };
    })
    res.json(citywithicon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};
 //Add a new city
export const addCity = async (req, res) => {
  console.log(req.body)
   try {
    const { name, code, stateId, countryId, description } = req.body;
    const city = new City({ name, code, stateId, countryId, icon: req.file.path, description });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

// Delete a city
export const deleteCity = async (req, res) => { try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);

    if (fs.existsSync(city.icon)) {
            fs.unlink(city.icon, (err) => {
              if (err) {
                console.error("Error deleting image file:", err);
              }
            });
    }
    res.json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };

// Update a city
export const updateCity = async (req, res) => {  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCity = await City.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };
