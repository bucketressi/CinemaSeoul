import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProductExactType, CodeMatch, CodeType, CartProductType } from '../../Main/Type';
import { useProductTypeCodeState } from '../../Main/CodeModel';
import { useCartChange } from '../../Main/CartSync';
import "../../scss/pages/storeexact.scss";
import { Select, MenuItem, TextField} from '@material-ui/core';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { PageTitle, Cart } from '../../Components';
import { Button } from '@material-ui/core';

interface MatchParams {
	prod_id: string
}

const StoreExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const cartChange = useCartChange();
	const prodType = useProductTypeCodeState();
	const [prodTypeObj, setProdTypeObj] = useState<CodeMatch | undefined>(undefined);
	const [product, setProduct] = useState<ProductExactType | undefined>(undefined); // 상품 정보
	const [productNum, setProductNum] = useState<number>(0); // 상품 개수

	useEffect(() => {
		const obj: CodeMatch = {};
		prodType.forEach((code: CodeType) => {
			obj[Number(code.code_id)] = code.code_name;
		})
		setProdTypeObj(obj);
	}, [prodType]);

	useEffect(() => {
		fetchProduct();
	}, []);

	const fetchProduct = () => {
		axios.get(`${SERVER_URL}/prod/select/${match.params.prod_id}`)
			.then((res) => {
				if (!res.data)
					return;
				setProduct(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handleProductNumChange = (e : any) =>  {
		if(!product)
			return;

		const num = Number(e.target.value);
		if(isNaN(num)){
			alert("숫자를 입력해주세요.");
			return;
		}
		if(num > product.limit){
			alert("남아있는 재고 만큼만 구매 가능합니다."); // todo : 결제 페이지에서도 재고 먼저 확인하고 다르면 goBack 시키기
			return;
		}
		setProductNum(num);
	}

	const productToCart = () => {
		if(!product)
			return;
		if(productNum === 0){
			alert("상품의 개수를 하나 이상 선택해주세요.");
			return;
		}

		let cartProducts : CartProductType = {};
		const localData = localStorage.getItem("product");
		if(localData !== null){
			cartProducts = JSON.parse(localData);
		}
		if(cartProducts[Number(product.prod_id)]){ // 기존에 있었으면 개수 더해주기
			const prevNum = cartProducts[Number(product.prod_id)].number;
			if(product.limit < productNum + prevNum){ // 재고보다 많은 수는 넣을 수 없음
				alert("재고보다 많이는 살 수 없습니다.");
				return;
			}
			cartProducts[Number(product.prod_id)] = {
				"product" : product,
				"number" : productNum + prevNum
			};
		}else{
			cartProducts[Number(product.prod_id)] = {
				"product" : product,
				"number" : productNum
			};
		}
		localStorage.setItem("product", JSON.stringify(cartProducts));
		cartChange();
		setProductNum(0);
	}

	return (
		<div>
			<PageTitle
				title="상품 상세"
				isButtonVisible={true}
			/>
			<Cart />
			{
				product ?
					<div className="product-exact-con">
						<div className="product-header">
							<div className="img-con">
								<img src="https://i.pinimg.com/236x/09/3f/84/093f8410929081023ec09091c8e71578.jpg" alt="상품 이미지" />
							</div>
							<div className="info-con">
								<div className="name">{product.prod_name}</div>
								<div className="price">
									<div className="sub-title">가격</div>
									{product.price}원
								</div>
								<div className="분류">
									<div className="sub-title">분류</div>
									{prodTypeObj && prodTypeObj[Number(product.prod_type_code)]}
								</div>
								<div className="재고">
									<div className="sub-title">재고</div>
									{product.limit}개
								</div>
								<div className="num-select">
									<TextField value={productNum} onChange={handleProductNumChange} label="상품 개수"/>
								</div>
								<div className="total-price"></div>
								<div className="btn-con"><Button variant="contained" color="primary" onClick={productToCart}>상품 담기</Button></div>
							</div>
						</div>
						<div className="product-content">
							<div>{product.prod_contents}</div>
						</div>
					</div>
					: <div>상품을 불러오는 중입니다.</div>
			}
		</div>
	);
}

export default StoreExact;
