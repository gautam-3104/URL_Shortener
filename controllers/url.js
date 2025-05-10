const shortid = require('shortid');
const URL = require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).render('home',{error : "URL is required !!"})
    }

    const shortID = shortid();
        await URL.create({
            shortId : shortID,
            redirectURL : body.url,
            visiteHistory : [] ,
        });
    return res.render('home',{id: shortID })
    //return res.status(201).json({ });
}
async function handleGetRedirect(req,res){
    const shortId = req.params.shortId;
    console.log("ShortId received:", shortId);
    const entry  = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory : {
                timestamp : Date.now(),
            }
        }
    })
    if (!entry) {
        console.log("No entry found for this shortId.");
        return res.status(404).send("Short URL not found in database.");
    }

    if (!entry.redirectURL) {
        console.log("redirectURL missing in the entry.");
        return res.status(400).send("Redirect URL is missing.");
    }
    console.log(entry.redirectURL);
    res.redirect(entry.redirectURL); 
}
async function handleGetAnalytics(req,res){
     const shortId = req.params.shortId;
     const result = await URL.findOne({shortId});
     return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory})
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetRedirect,
    handleGetAnalytics
};