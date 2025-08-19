const axios = require("axios");
const News = require("../models/news");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

exports.getNews = async (req, res) => {
    const {category} = req.query || "sports";
    const CACHE_DURATION = 24* 60 * 60 * 1000;

    try {
        let news = await News.findOne({ category });

        if (news && (Date.now() - news.lastFetched.getTime()) < CACHE_DURATION) {
            return res.status(200).json({ message: "New articles retrived successfully", articles : news.articles});
        }

        const response = await axios.get(`http://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&categories=${category}&languages=en&countries=in`);

        const articles = response.data.data || [];

        if (news) {
            news.articles = articles;
            news.lastFetched = Date.now();
            await news.save();
        } else {
            await News.create({ category, articles, lastFetched: Date.now() });
        }

        res.status(200).json({ message: "New articles retrived successfully", articles });
    } catch (error) {
        res.status(500).json({ message: error?.message || "Failed to fetch news" });
    }
};
