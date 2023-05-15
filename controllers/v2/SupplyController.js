const SavedItemModel = require('../../models/SavedItemModel')
const SupplyModel = require('../../models/SupplyModel')
const recommender = require('../../utils/ContentBasedFiltering')

const get_saved_items = async (req, res) => {
    const user_id = req.params.user_id
    const savedItems = await SavedItemModel.find({ user: user_id }).populate('item')
    if (savedItems) return res.send(savedItems)
}

const post_saved_items = async (req, res) => {
    const savedItem = req.body
    const save_item = await SavedItemModel.create({
        user: savedItem.user,
        item: savedItem.item._id
    })
    if (!save_item) return res.sendStatus(400)
    return res.status(200).json({ message: "Saved!", isError: false })
}

const delete_saved_items = async (req, res) => {
    const _id = req.query.id
    const delete_item = await SavedItemModel.deleteMany({ _id })
    if (!delete_item) return res.sendStatus(400)
    return res.status(200).json({ message: "Deleted!", isError: false })
}

const get_recommend = async (req, res) => {
    const user_id = req.params.user_id
    const last_saved_item = await SavedItemModel.findOne({ user: user_id }).sort({ _id: -1 })
    if (!last_saved_item) return res.send([])
    if (!recommender.data.length) await trainRecommender()
    const recommended_items = recommender.getSimilarDocuments(last_saved_item.item, 0, 5)
    const recommended_ids = recommended_items.map(item => item.id)
    const recommended_details = await SupplyModel.find({ _id: recommended_ids })
    res.send(
        recommended_ids.map(id => {
            const detail = recommended_details.filter(detail => { if (id == detail.id) return detail })
            return detail[0]
        })
    )
}

const trainRecommender = async () => {
    try {
        const supplies = await SupplyModel.find().select('_id item_type category unit_measurement')
        const raw_data = []
        for (supply of supplies) {
            raw_data.push({
                id: supply._id,
                content: `${supply.item_type.replaceAll(' ', '')} ${supply.category.replaceAll(' ', '')} ${supply.unit_measurement.replaceAll(' ', '')}`
            })
        }
        recommender.train(raw_data)
    }
    catch (e) {
        console.log(e)
    }
}


const put_add_supply = async (req, res) => {
    const payload = req.body
    console.log(payload)
    const supply = await SupplyModel.findOneAndUpdate({_id: payload._id}, {$inc : {current_supply: payload.quantity}})
    if(!supply) return res.sendStatus(400)
    return res.sendStatus(200)
}

module.exports = {
    get_saved_items,
    post_saved_items,
    delete_saved_items,
    get_recommend,
    put_add_supply
}