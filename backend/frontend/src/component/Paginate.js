import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        let to = {
          pathname: '/',
          search: `?keyword=${keyword || ''}&page=${x + 1}`
        };

        if (isAdmin) {
          to = {
            pathname: '/admin/productlist/',
            search: `?keyword=${keyword || ''}&page=${x + 1}`
          };
        }

        return (
          <LinkContainer key={x + 1} to={to}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  );
}

export default Paginate;
