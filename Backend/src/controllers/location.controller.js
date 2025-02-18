import {Country,City,State} from "../models/location.js";


// Fetch all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new country
export const addCountry = async (req, res) => {
  console.log(req.body)
  try {
    const { name, code } = req.body;
    const country = new Country({ name, code });
    await country.save();
    res.status(201).json({message:"Country has been added Succefully",country});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a country
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.findByIdAndDelete(id);
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
    const id = req.body
     try {
    const states = await State.findById(id);
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

//Add a new state
export const addState = async (req, res) => { try {
    const { name, code,countryId } = req.body;
    const state = new State({ name, code, countryId });
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } };

// Delete a state
export const deleteState = async (req, res) => { try {
    const { id } = req.params;
    await State.findByIdAndDelete(id);
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
    const {countryid,stateid} = req.body
    try {
    const Cities = await City.findById();
    res.json(Cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};
 //Add a new city
export const addCity = async (req, res) => { try {
    const { name, code, stateId, countryId } = req.body;
    const city = new City({ name, code, stateId, countryId });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

// Delete a city
export const deleteCity = async (req, res) => { try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
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
