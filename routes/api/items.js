import * as express from "express";
import { Router } from "express";
const router = Router();

import Item from "../../models/Item";

// @route GET /api/items
// get all items
// access Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});


// @route POST /api/items
// make new item
// access Public

router.post('/', (req, res) => {
    let newItem = new Item({
        name: req.body.name
    })

    newItem.save()
        .then(item => res.json(item))
  });

  // @route DELETE /api/items
// delete an item
// access Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success: true})) )
    .catch(err => res.status(401).json({success: false}))
});

export default router
