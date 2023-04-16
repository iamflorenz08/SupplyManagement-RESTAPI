const SavedItemModel = require('../../models/SavedItemModel')

const get_saved_items = async (req,res) =>{
    const user_id = req.params.user_id
    const savedItems = await SavedItemModel.find({user_id}).populate('item')
    if(savedItems) return res.send(savedItems)
}

const post_saved_items = async(req,res) => {
    const savedItem = req.body
    const save_item = await SavedItemModel.create({
        user: savedItem.user,
        item: savedItem.item._id
    })
    if(!save_item) return res.sendStatus(400)
    return res.status(200).json({message: "Saved!", isError: false})
}

const delete_saved_items = async(req,res) => {
    const _id = req.query.id
    const delete_item = await SavedItemModel.deleteMany({_id})
    if(!delete_item) return res.sendStatus(400)
    return res.status(200).json({message: "Deleted!", isError: false})
}

module.exports = {
    get_saved_items,
    post_saved_items,
    delete_saved_items
}