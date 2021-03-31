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

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const tweetsId = await Tweet.findByPk(req.params.id)
    const id = parseInt(tweetsId)
    res.json({id})
}))

module.exports = router
