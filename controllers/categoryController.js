const Category = require("../models/category")
const {validateCategory} = require("../validator")

exports.createCategory = async (req, res)=>{
try {
const {error} = validateCategory(req.body)
if (error) {
res.json(error.details[0].message)
}
const category = new Category({
name: req.body.name,
description: req.body.description
})

const categoryItem = await category.save()
res.json(categoryItem)
} catch (error) {
res.json({message: error.message})
}
},

exports.updateCategory = async (req, res)=>{
try {
const category = await Category.findById(req.params.id)
if (!category) {
res.json("The Brand entered is not found!!!")
}

const {error} = validateCategory(req.body)
if (error) {
res.json(error.details[0].message)
}

category.name = req.body.name,
category.description = req.body.description

const categoryUpdate = await category.save()
res.json(categoryUpdate)
} catch (error) {
res.json({message: error.message}); 
}
};

exports.getSingleCategory = async (req, res)=>{
try {
const category = await Category.findById(req.params.id)
if (!category){
res.status(404).json("The Data is not Found")
}
res.json(category)
} catch (error) {
res.json({message: error});
}
};

exports.getAllCategory = async (req, res)=>{
try {
const category = await Category.find()
res.json(category)
} catch (error) {
res.json({message: error});
}
};

exports.deleteCategory = async (req, res)=>{
try {
const category = await Category.findByIdAndDelete(req.params.id)
if (!category) {
res.json("No such Data found")
}
res.json(category)
} catch (error) {
res.json({message: error});
}
};
