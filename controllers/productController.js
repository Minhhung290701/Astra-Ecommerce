//const Products = require('../models/productModel')
const {productsCollection} = require('../models/productModel')
const {Format} = require('../libs')
// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = {...this.queryString} // queryString = req.query
    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete(queryObj[el]))

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    this.query.find(JSON.parse(queryStr))

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)

    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      let Products = await productsCollection()
      let where = {}
      if(req.query.category) {
        where.category = { $eq: req.query.category }
      }

      const pro = await Products._get(null,{
        params: {
          where: where,
          "page-size": req.query.limit,
        }})
      const products = Format.formatTo_id(pro)
      let productEnd = []
      if(req.query.title.regex != '') {
        Promise.all(
          await products.map( (x) => {
            if(x.title.indexOf(req.query.title.regex) != -1) {
              productEnd.push(x)
            }
          }
        ))
      }
      else {
        productEnd = products
      }

      res.json({
        status: 'success',
        result: productEnd.length,
        products: productEnd
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createProduct: async (req, res) => {
    try {
      let Products = await productsCollection()
      const {product_id, title, price, description, content, images, category, sold} = req.body;
      if (!images) return res.status(400).json({msg: "No image upload."})

      const product = await Products.findOne({ product_id: {$eq : product_id} })
      if (product) return res.status(400).json({msg: "This product already exists."})

      const newProduct = {
        product_id: product_id,
        title: title.toLowerCase(),
        price: price,
        description: description,
        content: content,
        images: images,
        category: category,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const document = await Products.create(newProduct)
      await Products.update(`${document.documentId}`, {
        _id: document.documentId
      });

      res.json({msg: "Created a product."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let Products = await productsCollection()
      await Products.delete(req.params.id)
      res.json({msg: "Deleted a product."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  updateProduct: async (req, res) => {
    try {
      let Products = await productsCollection()
      const {title, price, description, content, images, category} = req.body;
      if (!images) return res.status(400).json({msg: "No image upload."})
      
      await Products.update(req.params.id, {
        title: title.toLowerCase(), price:price, description:description, content:content, images:images, category:category
      })

      res.json({msg: "Updated a product"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
}

module.exports = productController