import React, { useEffect, useState } from 'react';
import PageTitle from './PageTitle';
import "../scss/component/_cart.scss";
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CartProductType, ProductExactType } from '../Main/Type';
import { useCartState, useCartChange } from '../Main/CartSync';
import { useHistory } from 'react-router-dom';

const Cart = () => {
	const history = useHistory();
	const change = useCartState();
	const cartChange = useCartChange();
	const [open, setOpen] = useState<boolean>(false);
	const [cartProduct, setCartProduct] = useState<CartProductType | undefined>(undefined);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		fetchProduct();
	}, [change]);

	const fetchProduct = () => {
		const localData = localStorage.getItem("product");
		if (!localData)
			return;
		const products : CartProductType = JSON.parse(localData) as CartProductType;
		setCartProduct(products);

		let price = 0;

		for(const key in products){
			price += products[Number(key)].product.price * products[Number(key)].number;
		}

		setTotalPrice(price);
	}

	const removeFromCart = (id: number) => {
		const obj: CartProductType = Object.assign({}, cartProduct);
		delete obj[id];
		localStorage.setItem("product", JSON.stringify(obj));
		alert("상품을 장바구니에서 제거하였습니다.");
		cartChange();
	}

	const gotoPay = () => {
		alert("결제 창으로 이동합니다.")
		history.push("/product/pay")
	}

	return (
		<>
			<div className={clsx("cart", open ? "visible" : "unvisible")}>
				{
					open ?
						<Button onClick={() => setOpen(false)}><ArrowForwardIcon /></Button> :
						<Button onClick={() => setOpen(true)}><ArrowBackIcon /></Button>
				}
				{
					open &&
					<>
						<PageTitle
							title="장바구니"
							isButtonVisible={false}
						/>
						{
							cartProduct && Object.keys(cartProduct).length !== 0 &&
							<>
								<div>
									{
										cartProduct &&
										Object.keys(cartProduct).map((id: string) => {
											const product = cartProduct[Number(id)];
											return (
												<div key={id} className="cart-component">
													<div className="name">{product.product.prod_name}</div>
													<div className="number">{product.number}개</div>
													<Button variant="contained" color="primary" onClick={() => removeFromCart(Number(id))}>삭제하기</Button>
												</div>
											);
										})
									}
								</div>
								<div className="pay-con">
									<div className="info-con">
										<div>총 가격</div>
										<div className="price">{totalPrice}원</div>
									</div>
									<Button variant="contained" color="secondary" onClick={gotoPay}>결제하기</Button>
								</div>
							</>
						}
					</>
				}
			</div>
		</>
	);
}

export default Cart;