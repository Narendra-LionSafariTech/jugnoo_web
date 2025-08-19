const axios = require("axios");
const Cricket = require("../models/cricket");

const CRICKET_API_KEY = process.env.CRICKET_API_KEY;

exports.currentCricketMatches = async (req, res) => {
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    try {
        let cricketData = await Cricket.findOne({});

        if (cricketData && (Date.now() - cricketData.lastFetched.getTime()) < CACHE_DURATION) {
            return res.status(200).json({message: "Current matches data retrived successfully",matches:cricketData.matches});
        }

        const response = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`);

        const matches = response.data.data || [];

        if (cricketData) {
            cricketData.matches = matches;
            cricketData.lastFetched = Date.now();
            await cricketData.save();
        } else {
            await Cricket.create({ matches, lastFetched: Date.now() });
        }

        res.status(200).json({ message: "Current matches data retrived successfully", matches });
    } catch (error) {
        res.status(500).json({ message: error?.message || "Failed to fetch cricket scores" });
    }
};
