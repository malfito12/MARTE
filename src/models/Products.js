const mongoose=require('../database')
const PRODUCTSCHEMA={
    numberProduct:String,
    nameProduct:String,
    type:String,
    cant:String,
    price:String,
    description:String
}
const PRODUCT=mongoose.model('producto',PRODUCTSCHEMA)
module.exports=PRODUCT