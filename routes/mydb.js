const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')
const fs = require('fs')
const users = require('../data/products.json')

// Init cache
let cache = apicache.middleware

router.get("/:id", (req, res) => {
    let id = req.params.id;
    let post = users.find((post) => post.id == id);
    if (!post) {
        res.json({ Message: "Not Found Any Post Related to Your ID" });
    } else {
        res.json(post);
    }
});




module.exports = router