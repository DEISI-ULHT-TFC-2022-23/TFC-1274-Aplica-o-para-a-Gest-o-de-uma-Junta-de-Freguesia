const express = require('express')
const router = express.Router()
const { Escalao } = require('../models')

router.get("/", async (req, res) =>{
    const listOfPost = await Escalao.findAll();
    res.json(listOfPost);
});

router.post("/", async (req, res) =>{
    const cc = req.body;
    await Escalao.create(cc);
    res.json(cc);
})

module.exports = router