const { query } = require('express');
const SupplyModel = require('../models/SupplyModel')

const post_all_details = async (req, res) => {
    try {
        const SupplyDetails = await SupplyModel.find();
        if (!SupplyDetails) return res.status(200).json({ message: "empty" })
        return res.status(200).json(SupplyDetails)
    } catch {
        return res.sendStatus(400)
    }
}

const get_all_details = async (req, res) => {
    const page = req.params.page || 0
    const limit = req.params.limit || 0
    const skip = (page - 1) * limit
    const query = req.query
    let filter = {}
    let sort = true //{ current_supply: 1 }
    if (query) {
        if (query.item_type) {
            filter = { item_type: query.item_type }
        }

        if (query.category) {
            let category = null

            if (query.category === 'project_free') {
                category = 'Project Free'
            }
            else if (query.category === 'office_supplies') {
                category = 'Office Supplies'
            }
            else if (query.category === 'school_supplies') {
                category = 'School Supplies'
            }
            else if (query.category === 'equipment') {
                category = 'Equipment'
            }

            filter = { ...filter, category }
        }

        if (query.sort_by) {
            sort = false //{ current_supply: -1 }
        }

        if (query.search) {
            filter = { ...filter, item_name: { $regex: '.*' + query.search + '.*', $options: 'i' } }
        }
    }

    try {
        const SupplyDetails = await SupplyModel.find({ ...filter, archive: [null, false] })//.sort(sort) //.skip(skip).limit(limit)
        if (!SupplyDetails) return res.status(200).json({ message: "empty" })
        SupplyDetails.sort((a, b) => {
            const percentA = ((a.current_supply - a.buffer) / a.buffer) * 100
            const percentB = ((b.current_supply - b.buffer) / b.buffer) * 100
            if (sort) {
                return percentA - percentB
            }
            return percentB - percentA
        })

        if (skip || limit) {
            return res.status(200).json(SupplyDetails.slice(skip, parseInt(skip) + parseInt(limit)))
        }
        return res.status(200).json(SupplyDetails)

    } catch {
        return res.sendStatus(400)
    }
}

const get_supply_detail = async (req, res) => {
    const stock_id = req.params.stock_id
    const stock_detail = await SupplyModel.findOne({ _id: stock_id })
    if (!stock_detail) return res.status(200).json({ message: "", isError: true })
    return res.status(200).json(stock_detail)
}

const post_add_item = async (req, res) => {
    try {
        const SupplyDetail = await SupplyModel.create(req.body).catch(err => { console.log(err) })
        if (!SupplyDetail) return res.status(400).json({ message: "Couldn't create.", isError: true })
        res.status(200).json({ message: "Success.", isError: false })
    } catch {
        res.status(400).json({ message: "Couldn't create.", isError: true })
    }
}

const delete_item = async (req, res) => {
    const _id = req.query.id
    await SupplyModel.findOneAndUpdate({ _id }, { archive: true })
    return res.sendStatus(200)
}

const get_supply_count = async (req, res) => {
    const query = req.query
    let filter = {}
    if (query) {
        if (query.item_type) {
            filter = { item_type: query.item_type }
        }

        if (query.category) {
            let category = null

            if (query.category === 'project_free') {
                category = 'Project Free'
            }
            else if (query.category === 'office_supplies') {
                category = 'Office Supplies'
            }
            else if (query.category === 'school_supplies') {
                category = 'School Supplies'
            }
            else if (query.category === 'equipment') {
                category = 'equipment'
            }

            filter = { ...filter, category }
        }

        if (query.search) {
            filter = { ...filter, item_name: { $regex: '.*' + query.search + '.*', $options: 'i' } }
        }
    }
    const stock_count = await SupplyModel.countDocuments({ ...filter, archive: [null, false] })
    res.status(200).json({ stock_count })
}

const post_edit_details = async (req, res) => {
    const body = req.body
    await SupplyModel.findByIdAndUpdate({ _id: body._id }, body)
    res.sendStatus(200)
}

const get_not_available = async (req, res) => {
    const stocks = await SupplyModel.find({ current_supply: 0 })
    if (!stocks) return res.status(200).json({ isError: true })
    res.status(200).json(stocks)
}

module.exports = {
    post_add_item,
    post_all_details,
    get_all_details,
    get_supply_count,
    get_supply_detail,
    post_edit_details,
    delete_item,
    get_not_available
}