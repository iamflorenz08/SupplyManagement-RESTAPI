const RequistionModel = require('../models/RequsitionModel')
const SupplyModel = require('../models/SupplyModel')
const UserModel = require('../models/UserModel')
const StockLogModel = require('../models/StockLogModel')
const NotificationModel = require('../models/NotificationModel')

const post_request_item = async (req, res) => {
    const raw_items = req.body.items
    const product_codes = []
    let isValid = true
    raw_items.map(item => {
        product_codes.push(item.product_code)
    })

    const stocks_db = await SupplyModel.find().where('product_code').in(product_codes).select('product_code current_supply')

    raw_items.map(item => {
        const stock = stocks_db.find(stock => { return stock.product_code === item.product_code })
        if (item.quantity > stock.current_supply)
            isValid = false
    })

    if (!isValid) return res.status(200).json({ message: "Failed to request", isError: true })

    const RequestItem = await RequistionModel.create(req.body)

    await NotificationModel.create({
        user: req.body.user_id,
        request: RequestItem._id,
        approval: 'to_be_approved',
        isRead: false
    })

    if (!RequestItem) return res.status(200).json({ message: "Error", isError: true })
    return res.status(200).json({ message: "Success", isError: false })
}

const get_mobile_requisition = async (req, res) => {
    const user_id = req.query.user_id
    const requisitions = await RequistionModel.find({ user_id })
    if (!requisitions) return res.status(200).json({ isError: true })
    res.status(200).json(requisitions)
}

const get_requisition = async (req, res) => {
    const page = req.params.page || {}
    const limit = req.params.limit || {}
    const skip = (page - 1) * limit
    let filter = null
    let query = req.query

    if (query.type === 'dashboard') {
        filter = { status: 'To be approved' }
    }
    else if (query.type === 'requisition') {
        filter = { status: ['To be approved', 'On going'] }
    }
    else if (query.type === 'logs') {
        filter = { status: ['Completed', 'Rejected', 'Cancelled'] }
    }

    if (query.date) {
        let date = new Date()

        if (query.date === 'today') {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'week') {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'month') {
            date = new Date(date.getFullYear(), date.getMonth())
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'year') {
            date = new Date(date.getFullYear(), 0)
            filter = { ...filter, createdAt: { $gte: date } }
        }
    }

    if (query.status) {
        if (query.status === 'to_be_approved') {
            filter.status = ['To be approved']
        }

        if (query.status === 'on_going') {
            filter.status = ['On going']
        }
    }
    let non_registered_filter = {...filter}

    if(query.search){
        const user_ids = await UserModel.find({id_no: {$regex: '.*' + query.search + '.*' }}).select('_id')
        non_registered_filter = {...non_registered_filter,'userDetails.id_no': {$regex: '.*' + query.search + '.*'}}
        filter = {...filter, user_id: user_ids}
    }

    const Requisition = await RequistionModel.find({$or: [filter, non_registered_filter]})
        .skip(skip)
        .limit(limit)
        .populate('user_id', '-password')
        .sort({ 'createdAt': -1 })


    res.status(200).json(Requisition)
}

const get_requisition_count = async (req, res) => {
    const query = req.query
    let filter = null

    if (query.type === 'requisition') {
        filter = { status: ['To be approved', 'On going'] }
    }
    else if (query.type === 'logs') {
        filter = { status: ['Completed', 'Rejected', 'Cancelled'] }
    }

    if (query.date) {
        let date = new Date()

        if (query.date === 'today') {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'week') {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'month') {
            date = new Date(date.getFullYear(), date.getMonth())
            filter = { ...filter, createdAt: { $gte: date } }
        }
        else if (query.date === 'year') {
            date = new Date(date.getFullYear(), 0)
            filter = { ...filter, createdAt: { $gte: date } }
        }
    }

    if (query.status) {
        if (query.status === 'to_be_approved') {
            filter.status = ['To be approved']
        }

        if (query.status === 'on_going') {
            filter.status = ['On going']
        }
    }

    let non_registered_filter = {...filter}
    if(query.search){
        const user_ids = await UserModel.find({id_no: {$regex: '.*' + query.search + '.*' }}).select('_id')
        non_registered_filter = {...non_registered_filter,'userDetails.id_no': {$regex: '.*' + query.search + '.*'}}
        filter = {...filter, user_id: user_ids}
    }

    const count = await RequistionModel.countDocuments({$or: [filter, non_registered_filter]})
    return res.status(200).json({ count })
}

const get_requisition_dashboard = async (req, res) => {
    const Requisition = await RequistionModel.find({ status: 'To be approved' }).sort({ createdAt: -1 }).limit(req.params.limit)
    const user_ids = []
    const result = []

    Requisition.map(result => {
        user_ids.push(result.user_id)
    })

    const User_Infos = await UserModel.find({ _id: [... new Set(user_ids)] }).select('email photo_URL full_name mobile_number department position isApproved createdAt')

    Requisition.map(request => {
        const user = User_Infos.find(user => {
            return user._id == request.user_id
        })
        result.push({
            user,
            request
        })
    })

    if (!Requisition) return res.status(401)
    res.status(200).json(result)
}

const get_requisition_dashboard_info = async (req, res) => {
    const Requisition = await RequistionModel.findOne({ _id: req.params.request_id })
    const User_Infos = await UserModel.findOne({ _id: Requisition.user_id }).select('email photo_URL full_name mobile_number department position isApproved createdAt')

    if (!Requisition) return res.status(401)
    res.status(200).json({
        user: User_Infos,
        request: Requisition
    })
}

const post_users = (req, res) => {
    const user_ids = req.body.user_id
    UserModel.find().where('_id').in(user_ids).select('email photo_URL full_name mobile_number department position isApproved createdAt')
        .then(result => {
            res.status(200).json(result)
        })
}

const post_approve = async (req, res) => {
    const request_id = req.params.requestID

    let status = "To be approved"

    if (req.params.isApprove === "true") {
        status = "On going"
    }
    else {
        status = "Rejected"
    }

    if (status != "Rejected") {
        const request_items = await RequistionModel.findOne({ _id: request_id });
        if (!request_items) return res.sendStatus(200)

        for (const item of request_items.items) {
            const supply = await SupplyModel.findOne({ product_code: item.product_code, current_supply: { $gt: item.quantity - 1 } })
            if (!supply) return res.status(200).json({ message: `Some item is out stock.`, isError: true })
        }

        for (const item of request_items.items) {
            const supply = await SupplyModel.findOneAndUpdate({ product_code: item.product_code, current_supply: { $gt: item.quantity - 1 } },
                { $inc: { current_supply: -item.quantity } });

            const stock_log = await StockLogModel.create({
                user: request_items.user_id,
                requestID: request_id,
                requestItem: supply._id,
                itemQuantity: item.quantity,
                remainingItem: supply.current_supply - item.quantity,
                isReturned: supply.item_type === 'RIS'
            })

            if (!supply) return res.status(200).json({ message: "An error occured.", isError: true })
        }
    }

    const updateStatus = await RequistionModel.findOneAndUpdate({ _id: request_id }, { status })
    if (!updateStatus) return res.status(200).json({ message: "An error occurred.", isError: true })
    await NotificationModel.create({
        user: updateStatus.user_id,
        request: request_id,
        approval: req.params.isApprove === 'true' ? 'on_going' : 'rejected',
        isRead: false
    })
    return res.status(200).json({ message: "The requested items are approved", isError: false })

}

const post_add_request = async (req, res) => {
    const request = req.body

    for (const item of request.items) {
        const supply = await SupplyModel.findOne({ product_code: item.product_code, current_supply: { $gt: item.quantity - 1 } })
        if (!supply) return res.status(200).json({ message: `Some item is out stock.`, isError: true })
    }
    const requisition = await RequistionModel.create(request)
    if (!requisition) return res.status(200).json({ message: "", isError: true })

    for (const item of request.items) {
        const supply = await SupplyModel.findOneAndUpdate({ product_code: item.product_code, current_supply: { $gt: item.quantity - 1 } },
            { $inc: { current_supply: -item.quantity } });
        if (!supply) return res.status(200).json({ message: "An error occured.", isError: true })

        const stock_log = await StockLogModel.create({
            userDetails: requisition.userDetails,
            requestID: requisition._id,
            requestItem: supply._id,
            itemQuantity: item.quantity,
            remainingItem: supply.current_supply - item.quantity,
            isReturned: supply.item_type === 'RIS'
        })
    }
    return res.status(200).json({ message: "", isError: false })
}

const post_complete_request = async (req, res) => {
    const _id = req.query.id
    const mark_complete = await RequistionModel.findOneAndUpdate({ _id }, { status: 'Completed' })

    for (const item of mark_complete.items) {

        if (item.item_type === 'RIS') continue

        const supply = await SupplyModel.findOneAndUpdate({ product_code: item.product_code },
            { $inc: { current_supply: +item.quantity } });
        if (!supply) return res.status(200).json({ message: "An error occured.", isError: true })


        const stock_log = await StockLogModel.create({
            user: mark_complete.user_id || null,
            userDetails: mark_complete.userDetails || null,
            requestID: mark_complete._id,
            requestItem: supply._id,
            itemQuantity: item.quantity,
            remainingItem: supply.current_supply + item.quantity,
            isReturned: true
        })
    }
    if (!mark_complete) return res.status(200).json({ message: "Server error.", isError: true })
    
    if(mark_complete.user_id){
        await NotificationModel.create({
            user: mark_complete.user_id,
            request: _id,
            approval: 'completed',
            isRead: false
        })
    }
    
    res.status(200).json({ message: "Mark as completed", isError: false })
}

const request_info = async (req, res) => {
    const _id = req.params.id
    const requisition = await RequistionModel.findById({ _id })
    if (!requisition) return res.status(200).json({ message: 'Error', isError: true })
    res.status(200).json(requisition)
}

module.exports = {
    post_request_item,
    get_requisition,
    post_users,
    post_approve,
    get_requisition_dashboard,
    get_requisition_dashboard_info,
    get_requisition_count,
    post_add_request,
    post_complete_request,
    request_info,
    get_mobile_requisition
}