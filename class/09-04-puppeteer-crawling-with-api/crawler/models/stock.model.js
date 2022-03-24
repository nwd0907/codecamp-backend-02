import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    name: String,
    date: Date,
    price: Number
})

export const Stock = mongoose.model("Stock", stockSchema)