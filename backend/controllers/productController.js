import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch all products
//@route GET /api/products
//@access public
export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1
    const subcategory = req.query.subcategory
        ? {
              subCategory: req.query.subcategory,
          }
        : {}
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const count = await Product.countDocuments({ ...keyword, ...subcategory })

    const products = await Product.find({ ...keyword, ...subcategory })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc Fetch specific product
//@route GET /api/products/:id
//@access public
export const getProductById = asyncHandler(async (req, res) => {
    const prod = await Product.findById(req.params.id)
    if (prod) {
        res.json(prod)
    } else {
        res.status(404)
        throw new Error('Product not found') //goes through custom error handling middleware
    }
})

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const prod = await Product.findById(req.params.id)
    if (prod) {
        await prod.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found') //goes through custom error handling middleware
    }
})

//@desc Create a product
//@route POST /api/products
//@access Private/admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        subCategory: 'Sample sub category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc Update a product
//@route PUT /api/products/:id
//@access Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        subCategory,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.subCategory = subCategory
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Create new review
//@route POST /api/products/:id/reviews
//@access Private
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Get top rated products
//@route POST /api/products/top
//@access Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})
