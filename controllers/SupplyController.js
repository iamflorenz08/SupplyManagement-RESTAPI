const SupplyModel = require('../models/SupplyModel')

const post_all_details = async (req,res)=>{
    try{
        const SupplyDetails = await SupplyModel.find();
        if(!SupplyDetails) return res.status(200).json({message: "empty"})
        return res.status(200).json(SupplyDetails)
    }catch{
        return res.sendStatus(400)
    }
}

const get_all_details = async (req,res)=>{
    try{
        const SupplyDetails = await SupplyModel.find();
        if(!SupplyDetails) return res.status(200).json({message: "empty"})
        return res.status(200).json(SupplyDetails)
    }catch{
        return res.sendStatus(400)
    }
}

const post_add_item = async(req,res) => {
    try{
        console.log(req.body)
        const SupplyDetail = await SupplyModel.create(req.body).catch(err=>{console.log(err)})
        if(!SupplyDetail) return res.status(400).json({message: "Couldn't create."})

        res.status(200).json({message: "Success."})
    }catch{
        res.status(400).json({message: "Couldn't create."})
    }
}

const post_added_item = (req,res) =>{
    
}


module.exports = {
    post_add_item,
    post_all_details,
    get_all_details
}