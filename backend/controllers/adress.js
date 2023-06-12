const kladrApi = require("kladrapi-for-node");
const sale = require("../models/sales");

const Kladr = new kladrApi();


let q = {query: 'Мос', contentType: 'city', withParent: 0};
let s = {cityID: '7700000000000', query: 'Новикова', contentType: 'street', withParent: 0};

module.exports.getCity = (req, res, next) => {
    Kladr.getData(q, (err, result)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    })
};

module.exports.getStreet = (req, res, next) => {
    Kladr.getData(s, (err, result)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    })
};

