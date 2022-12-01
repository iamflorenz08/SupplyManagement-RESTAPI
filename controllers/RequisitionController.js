const RequistionModel = require('../models/RequsitionModel')
const SupplyModel = require('../models/SupplyModel')
const UserModel = require('../models/UserModel')

const post_request_item = async (req,res) => {
    const raw_items = req.body.items
    const product_codes = []
    let isValid = true

    raw_items.map(item=>{
        product_codes.push(item.product_code)
    })

    const stocks_db = await SupplyModel.find().where('product_code').in(product_codes).select('product_code current_supply')
    
    raw_items.map(item=>{
        const stock = stocks_db.find(stock=>{return stock.product_code === item.product_code})
        if(item.quantity > stock.current_supply)
            isValid = false
    })

    if(!isValid) return res.status(200).json({message:"Failed to request", isError: true})

    const RequestItem = await RequistionModel.create(req.body)
    if(!RequestItem) return res.status(200).json({message:"Error", isError: true})
    return res.status(200).json({message:"Success", isError: false})
}

const get_requisition = async(req,res) => {
    const Requisition = await RequistionModel.find()
    if(!Requisition) return res.status(401)
    res.status(200).json(Requisition)
}

const post_users = (req,res) => {
    const user_ids = req.body.user_id
    UserModel.find().where('_id').in(user_ids).select('email photo_URL full_name mobile_number department position isApproved createdAt')
        .then(result=>{
            res.status(200).json(result)
        })
}

const post_approve = async(req,res) => {
    const request_id = req.body.request_id
    let status = "To be approved"
    
    if(req.params.isApprove === "true"){
        status = "On going"
    }
    else{
        status = "Rejected"
    }
    console.log(1)
    
    const request_items = await RequistionModel.findOne({_id: request_id});
    if(!request_items) return res.sendStatus(200)
    
    for(const item of request_items.items){
        const supply = await SupplyModel.findOne({product_code: item.product_code, current_supply: {$gt:item.quantity-1}})
        if(!supply) return res.status(200).json({message:`Some item is out stock.`, isError: true})
    }

    for(const item of request_items.items){
        const supply = await SupplyModel.findOneAndUpdate({product_code: item.product_code, current_supply: {$gt:item.quantity-1}},
                                                {$inc: {current_supply: -item.quantity}})
        if(!supply) return res.status(200).json({message:"An error occured.", isError: true})
    }

    console.log(2)
    const updateStatus = await RequistionModel.findOneAndUpdate({_id: request_id}, {status})
    if(!updateStatus) return res.status(200).json({message:"An error occurred.", isError: true})
    return res.status(200).json({message:"The requested items are approved", isError: false})

}

module.exports = {
    post_request_item,
    get_requisition,
    post_users,
    post_approve
}