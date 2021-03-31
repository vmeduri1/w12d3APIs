const express = require('express');
const router = express.Router();
const db = require("../db/models");
const { Tweet } = db;
const { check, validationResult } = require('express-validator');

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
const tweetValidators = [
    check('message')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a message for Tweet')
      .isLength({ max: 280 })
      .withMessage('Tweet must not be more than 255 characters long')
    ]

router.post('/tweets', tweetValidators, asyncHandler(async (req, res) => {
      const { message } = req.body

      const tweet = db.Tweet.build({ message });

      const validatorErrors = validationResult(req);

      if(validatorErrors.isEmpty()) {
          await tweet.save();
          res.redirect('/');
      } else {
          const errors = validatorErrors.array().map(error => error.msg);
          const err = Error("Bad request.");
          err.errors = errors;
          err.status = 400;
          err.title = "Bad request.";
          next(err);
      }
}))

module.exports = router
