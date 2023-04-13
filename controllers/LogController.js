const StockLogModel = require('../models/StockLogModel')
const RequisitionModel = require('../models/RequsitionModel')
const SupplyModel = require('../models/SupplyModel')

const get_stock_logs = async(req,res) => {
    const page = req.params.page || 1
    const limit = req.params.limit || 0
    const skip = (page - 1) * limit
    let filter = req.params.sort || {}
    const query = req.query

    if(query){
        if(query.search){
            const stock_ids = await SupplyModel.find({item_name: {$regex: '.*' + query.search + '.*', $options: 'i' }}).select('_id')
            filter = {requestItem: stock_ids}
        }
    }

    if(filter === 'dashboard'){
        filter = {isReturned: true}
    }

    const stock_log = await StockLogModel.find(filter).skip(skip).limit(limit)
        .populate('user', 'full_name')
        .populate('requestID', 'createdAt updatedAt')
        .populate('requestItem')
        .sort({createdAt: -1})

    res.status(200).json(stock_log)
}

const get_stock_logs_count = async(req,res) =>{
    const query = req.query
    let filter = {}

    if(query){
        if(query.search){
            const stock_ids = await SupplyModel.find({item_name: {$regex: '.*' + query.search + '.*', $options: 'i' }}).select('_id')
            filter = {requestItem: stock_ids}
        }
    }

    const stock_log = await StockLogModel.countDocuments(filter)

    res.status(200).json({count: stock_log})
}

const get_requisition_counts = async(req,res) =>{
    const sort = req.params.sort
    let result = {}
    

    if(sort === 'all'){
        const pendingCount = await RequisitionModel.countDocuments({status: 'To be approved'})
        const ongoingCount = await RequisitionModel.countDocuments({status: 'On going'}) 
        const completedCount = await RequisitionModel.countDocuments({status: 'Completed'}) 

        result = {
            pendingCount,
            ongoingCount,
            completedCount
        }
    }

    res.status(200).json(result)
}

module.exports = {
    get_stock_logs,
    get_requisition_counts,
    get_stock_logs_count
}