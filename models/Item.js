import { Schema, model } from 'mongoose';

//creat schema 

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})



const Item = model('item', ItemSchema);

export default Item;