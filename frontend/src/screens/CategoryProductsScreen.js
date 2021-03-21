import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'

const CategoryProductsScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const subcategory = match.params.subcategory

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, subcategory))
    }, [dispatch, keyword, pageNumber, subcategory])

    return (
        <>
            <Meta />
            <Link to="/" className="btn btn-light">
                Go Back
            </Link>
            <h1>{subcategory}</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                        subcategory={subcategory}
                    />
                </>
            )}
        </>
    )
}

export default CategoryProductsScreen
