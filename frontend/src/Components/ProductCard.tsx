import { Paper } from '@material-ui/core';
import React from 'react';
import { ProductType } from '../Main/Type';
import "../scss/component/_productcard.scss";
import clsx from 'clsx';
import { useHistory } from 'react-router';

type Props = {
	product : ProductType
}

const ProductCard = ({product} : Props) => {
	const history = useHistory();

	return (
		<Paper elevation={3} onClick={() => history.push(`/product/${product.prod_id}`)} className={clsx("product-card", product.limit===0?"sold-out":"")}>
			<div className="img-con">
				<span className="sold-out-cover"><p>sold out</p></span>
				<img src="https://i.pinimg.com/236x/09/3f/84/093f8410929081023ec09091c8e71578.jpg" alt="상품 이미지"/>
			</div>
			<div className="name">{product.prod_name}</div>
			<div className="price">{product.price}원</div>
			<div className="limit">재고 : {product.limit}개</div>
		</Paper>
	);
}

export default ProductCard;