import { Button, Paper } from '@material-ui/core';
import React from 'react';
import { ProductType } from '../Main/Type';
import "../scss/component/_productcard.scss";
import clsx from 'clsx';
import { useHistory } from 'react-router';

type Auth = ["admin", "user"];
type Props = {
	product : ProductType,
	auth: Auth[number],
	deleteFunction? : () => void
}

const ProductCard = ({product, auth, deleteFunction} : Props) => {
	const history = useHistory();

	const gotoExact = () => history.push(auth==="admin"?`/admin/product/${product.prod_id}`:`/product/${product.prod_id}`);

	return (
		<Paper elevation={3} className={clsx("product-card", product.limit===0?"sold-out":"")}>
			<div onClick={gotoExact} className="img-con">
				<span className="sold-out-cover"><p>sold out</p></span>
				<img src="https://i.pinimg.com/236x/09/3f/84/093f8410929081023ec09091c8e71578.jpg" alt="상품 이미지"/>
			</div>
			<div onClick={gotoExact} className="name">{product.prod_name}</div>
			<div onClick={gotoExact} className="price">{product.price}원</div>
			<div onClick={gotoExact} className="limit">재고 : {product.limit}개</div>
			{
				deleteFunction &&
				<Button variant="contained" color="secondary" onClick={deleteFunction}>삭제하기</Button>
			}
		</Paper>
	);
}

export default ProductCard;