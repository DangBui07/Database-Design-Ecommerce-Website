import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Paginate from '../component/Paginate'
import ProductCarousel from '../component/ProductCarousel'



function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products, pages, page } = productList

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get('keyword');
  const currentPage = Number(searchParams.get('page'));

  useEffect(() => {

    dispatch(listProducts(keyword, currentPage));
  }, [dispatch, searchParams]);

  const handlePageChange = (pageNumber) => {
    navigate(`/?keyword=${keyword}&page=${pageNumber}`);
  };

  return (
    <div>
      <ProductCarousel/>
      <h1>Welcome</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          <Row>

            {products && products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} onPageChange={handlePageChange} />
        </div >
      )}
    </div>
  )
}

export default HomeScreen
