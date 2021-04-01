const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/", handleValidationErrors, asyncHandler(async (req, res) => {
    const validateUsername =
        check("username")
            .exists({ checkFalsy: true })
            .withMessage("Please provide a username");

    const validateEmailAndPassword = [
        check("email")
            .exists({ checkFalsy: true })
            .isEmail()
            .withMessage("Please provide a valid email."),
        check("password")
            .exists({ checkFalsy: true })
            .withMessage("Please provide a password."),
    ];

    router.post(
        "/",
        validateUsername,
        validateEmailAndPassword,
        handleValidationErrors,
        asyncHandler(async (req, res) => {
            const { username, email, password } = req.body;
            //TODO: Create a user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create( { username, email, hashedPassword });
        })
    )
}))









module.exports = router;
