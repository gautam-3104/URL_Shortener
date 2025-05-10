const express = require("express");
const { handleGenerateNewShortURL , handleGetRedirect , handleGetAnalytics } = require('../controllers/url')
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId",handleGetRedirect);
router.get('/anaylytics/:shortId',handleGetAnalytics);
module.exports = router;