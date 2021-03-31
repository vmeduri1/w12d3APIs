const express = require('express');
const router = express.Router();
const db = require("../db/models");
const { Tweet } = db;

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);


router.get("/tweets", asyncHandler(async (req, res) => {
    // res.json({ message: "test tweets index" });
    const tweets = await Tweet.findAll();
    res.json({tweets});
}));

router.get('/tweets/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const tweet = await Tweet.findByPk(req.params.id)
        // const id = parseInt(tweetsId)
    if (tweet) {
        res.json({tweet})
    } else {
        next(tweetNotFoundError(req.params.id));
    }

}))

const tweetNotFoundError = function (tweetId) {
    const error = new Error('Tweet of given ID could not be found.')
    error.title = 'Tweet not found.';
    error.status = 404;
    return error;
}

router.post('/tweets', asyncHandler(async (req, res) => {

}))

module.exports = router
