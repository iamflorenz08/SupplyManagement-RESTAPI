const SupplyModel = require('../models/SupplyModel')

const post_all_details = async (req,res)=>{
    const SupplyDetails = await SupplyModel.find();
    if(!SupplyDetails) return res.status(200).json({message: "empty"})
    res.status(200).json(SupplyDetails)
}

const post_detail = async(req,res) => {
    try{
        const SupplyDetail = await SupplyModel.create(req.body)
        if(!SupplyDetail) return res.status(400).json({message: "Couldn't create."})

        res.status(200).json({message: "Success."})
    }catch{
        res.status(400).json({message: "Couldn't create."})
    }
}


module.exports = {
    post_detail,
    post_all_details
}