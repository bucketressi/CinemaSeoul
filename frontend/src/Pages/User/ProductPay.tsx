import React, { useEffect, useState } from 'react';
import { CartProductType, CodeMatch, ProductRequestType } from '../../Main/Type';
import { PageTitle } from '../../Components';
import { TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel,TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import { useProductTypeCodeState, usePayTypeCodeState } from '../../Main/CodeModel';
import "../../scss/pages/productpay.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { useHistory } from 'react-router';

const ProductPay = () => {
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();
	const productType = useProductTypeCodeState();
	const payTypeCode = usePayTypeCodeState();
	const userId = useUserState();

	const [productTypeObj, setProductTypeObj] = useState<CodeMatch>({});
	const [cartProduct, setCartProduct] = useState<CartProductType | undefined>(undefined);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [payType, setPayType] = useState<string>("");
	const [currentPoint, setCurrentPoint] = useState<number>(0);
	const [pointMoney, setPointMoney] = useState<number>(0);

	useEffect(() => {
		if(userId === undefined){
			alert("회원만 상품 결제를 할 수 있습니다. 로그인 해주세요.");
			history.push("/login");
			return;
		}
		fetchProduct();
	}, []);

	useEffect(() => {
		const obj: CodeMatch = {};

		productType.map((code) => {
			obj[Number(code.code_id)] = code.code_name;
		})

		setProductTypeObj(obj);
	}, [productType]);

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

	const productPay = () => {
		if(payType === ""){
			alert("결제 수단을 선택해주세요");
			return;
		}

		const arr : ProductRequestType[] = [];
		for(const prod_id in cartProduct){
			arr.push({
				prod_id : Number(prod_id),
				amount : cartProduct[Number(prod_id)].number,
				price : cartProduct[Number(prod_id)].product.price
			});
		}

		axios.post(`${SERVER_URL}/pay/product`,{
			user_id : userId,
			use_point : pointMoney,
			total_price : totalPrice -pointMoney,
			pay_type_code : payType,
			productInfo : arr
		},{
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				localStorage.setItem("product", "{}");
				history.push("/myPage");
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}
	
	/* point */
	
	const handlePointMoneyChange = (e: any) => {
		const money = Number(e.target.value);
		if (money > currentPoint) {
			alert("현재 보유하고 있는 포인트보다 많이 쓸 수 없습니다.");
			return;
		}
		setPointMoney(money);
	}

	const fetchPoint = () => {
		axios.get(`${SERVER_URL}/point/select/${userId}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				const num = Number(res.data);
				if (isNaN(num))
					return;
				setCurrentPoint(num);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div className="product-pay-con">
			<PageTitle
				title="상품 결제 페이지"
				isButtonVisible={true}
			/>
			<div className="pay-con">
				{
					cartProduct &&
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>이미지</TableCell>
									<TableCell>이름</TableCell>
									<TableCell>개당 가격</TableCell>
									<TableCell>타입</TableCell>
									<TableCell>개수</TableCell>
									<TableCell>합계</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									Object.keys(cartProduct).map((prod_id: string) => {
										const product = cartProduct[Number(prod_id)];
										return (
											<TableRow key={prod_id}>
												<TableCell className="img-con">
													<img src="https://i.pinimg.com/236x/09/3f/84/093f8410929081023ec09091c8e71578.jpg" alt="상품 이미지" />
												</TableCell>
												<TableCell className="prod-name-con">{product.product.prod_name}</TableCell>
												<TableCell className="prod-price-con">{product.product.price}원</TableCell>
												<TableCell className="prod-type-con">{productTypeObj[Number(product.product.prod_type_code)]}</TableCell>
												<TableCell className="prod-number-con">{product.number}개</TableCell>
												<TableCell className="prod-totalprice-con">{product.product.price * product.number}원</TableCell>
											</TableRow>
										);
									})
								}
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell className="bold-text">상품 총 가격</TableCell>
									<TableCell>{totalPrice}원</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				}
				<div className="two-in-one-con">
					<div className="pay-type-con">
						<div className="sub-title">결제 수단 선택</div>
						<RadioGroup name="state" value={payType} onChange={(e: any) => setPayType(e.target.value)}>
							{
								payTypeCode.map((code) =>
									<FormControlLabel key={code.code_id} value={code.code_id} control={<Radio color="primary" />} label={code.code_name} />
								)
							}
						</RadioGroup>
					</div>
					<div className="point-con">
						<div className="sub-title">포인트 사용</div>
						<TextField
							value={pointMoney}
							onChange={handlePointMoneyChange}
						/>
						<div className="current-point-con">
							<div className="point-info-con">
								<div className="point-header">사용가능 포인트</div>
								<div>{currentPoint}원</div>
								<Button variant="outlined" color="primary" onClick={fetchPoint}>포인트 불러오기</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="result-pay-con">
					<div className="total-price">
						<div>최종금액</div>
						<div>{totalPrice - pointMoney}원</div>
					</div>
					<div>
						<Button variant="contained" color="secondary" onClick={productPay}>결제하기</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductPay;