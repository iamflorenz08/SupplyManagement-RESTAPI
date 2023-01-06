const StockLogModel = require('../models/StockLogModel')
const RequisitionModel = require('../models/RequsitionModel')

const get_stock_logs = async(req,res) => {
    const page = req.params.page || 1
    const limit = req.params.limit || 0
    const skip = (page - 1) * limit
    let sort = req.params.sort || {}

    if(sort === 'dashboard'){
        sort = {isReturned: true}
    }

    const stock_log = await StockLogModel.find(sort).skip(skip).limit(limit)
        .populate('user', 'full_name')
        .populate('requestID', 'createdAt updatedAt')
        .populate('requestItem')
        .sort({createdAt: -1})

    res.status(200).json(stock_log)
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
    get_requisition_counts
}