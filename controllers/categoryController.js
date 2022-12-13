const {categoryCollection} = require('../models/categoryModel')
const Products = require('../models/productModel')
const {Format} = require('../libs')



const categoryController = {
  getCategories: async (req, res) => {
    try {
      let Category = await categoryCollection()
      const categories = await Category.get()
      console.log(categories)
      categories1 = Format.formatTo_id(categories)
      console.log(categories1)
      res.json(categories1)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createCategory: async (req, res) => {
    try {
      const {name} = req.body;
      let Category = await categoryCollection()
      const category = await Category.findOne({ name: {$eq : name} })
      if (category) return res.status(400).json({msg: "This category already exists."})

      /* const newCategory = await Category({name})
      
      await newCategory.save() */
      const newCategory ={
        name : name,
        createdAt: new Date(),
        updatedAt: new Date()
       }
       const document = await Category.create(newCategory)
       await Category.update(`${document.documentId}`, {
         _id: document.documentId
       });
      res.json({msg: "Created a category."})
    } catch (err) {
      return res.status(500).json({msg: err.message})      
    }
  },
  deleteCategory: async (req, res) => {
    try {
      let Category = await categoryCollection()
      //const products = await Products.findOne({category: req.params.id})
      //if (products) return res.status(400).json({msg: "Please delete all products with a relationship."})

      await Category.delete(req.params.id)
      //await Category.findByIdAndDelete(req.params.id)
      res.json({msg: "Deleted a category."})
    } catch (err) {
      return res.status(500).json({msg: err.message})            
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {name} = req.body;
      let Category = await categoryCollection()
      await Category.update(`${req.params.id}/name`, name)
      await Category.update(`${req.params.id}/updatedAt`, new Date())
      res.json({msg: "Updated a category."})
    } catch (err) {
      return res.status(500).json({msg: err.message})                  
    }
  }
}

module.exports = categoryController