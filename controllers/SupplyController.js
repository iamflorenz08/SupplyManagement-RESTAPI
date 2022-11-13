const SupplyModel = require('../models/SupplyModel')

const get_all_details = (req,res)=>{

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
    post_detail
}