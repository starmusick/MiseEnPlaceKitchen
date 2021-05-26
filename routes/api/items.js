const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public

router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then(item => res.json(item))
		.catch(err => res.status(404).json({ success: false }));
});

// @route POST api/items
// @desc Create A Post
// @access Private

router.post('/', auth, (req, res) => {
	const newItem = new Item({
		item_id: req.body.item_id,
		item_name: req.body.item_name,
		item_detail: req.body.item_detail,
		item_price: req.body.item_price,
		item_category: req.body.item_category,
	});

	newItem.save().then(item => res.json(item));
});

// @route PUT api/items
// @desc Edit an item
// @access Private
router.put('/:id', auth, async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);

		item.item_name = req.body.item_name;
		await item.save();

		res.json({ success: true });
	} catch (error) {
		res.status(404).json({ success: false, error });
	}
});

// @route DELETE api/items/:Id
// @desc Delete an Item
// @access Private

router.delete('/:id', auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
