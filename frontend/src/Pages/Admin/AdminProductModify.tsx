import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { ProductExactType, CodeMatch } from '../../Main/Type';
import { useProductTypeCodeState } from '../../Main/CodeModel';
import { PageTitle } from '../../Components';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import "../../scss/pages/storeexact.scss";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useTokenState } from '../../Main/TokenModel';

interface MatchParams {
	product_id: string
}

const AdminProductModify: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const productType = useProductTypeCodeState();
	const [prodTypeObj, setProdTypeObj] = useState<CodeMatch | undefined>(undefined);

	/* 상품 수정 */
	const [prodName, setProdName] = useState<string>("");
	const [price, setPrice] = useState<number>(0);
	const [prodType, setProdType] = useState<string>("");
	const [limit, setLimit] = useState<number>(0);
	const [contents, setContents] = useState<string>("");
	const [image, setImage] = useState<string>("");

	/* code */
	useEffect(() => {
		const obj: CodeMatch = {};
		productType.forEach((code) => {
			obj[Number(code.code_id)] = code.code_name;
		})
		setProdTypeObj(obj);
	}, [productType]);

	/* 상품 조회 */
	useEffect(() => {
		fetchProduct();
	}, []);

	const fetchProduct = () => {
		axios.get(`${SERVER_URL}/prod/select/${match.params.product_id}`)
			.then((res) => {
				if (!res.data)
					return;
				setProdName(res.data.prod_name);
				setPrice(Number(res.data.price));
				setProdType(res.data.prod_type_code);
				setLimit(Number(res.data.limit));
				setContents(res.data.prod_contents);
				// todo : img
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 상품 수정 */
	const handlePriceChange = (e: any) => {
		if (isNaN(Number(e.target.value))) {
			alert("숫자를 입력해주세요.");
			return;
		}
		setPrice(Number(e.target.value));
	}

	const handleLimitChange = (e: any) => {
		if (isNaN(Number(e.target.value))) {
			alert("숫자를 입력해주세요.");
			return;
		}
		setLimit(Number(e.target.value));
	}

	const saveProduct = () => {
		axios.put(`${SERVER_URL}/prod`, {
			"prod_id" : Number(match.params.product_id),
			"prod_name" : prodName,
			"price" : price,
			"prod_type_code" : prodType,
			"limit" : limit,
			"prod_contents" : contents,
			"image" : null
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				history.push("/admin/product");
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="상품 수정 페이지"
				isButtonVisible={true}
			/>
			<div className="product-exact-con">
				<div className="product-header">
					<div className="img-con">
						<img src="https://i.pinimg.com/236x/09/3f/84/093f8410929081023ec09091c8e71578.jpg" alt="상품 이미지" />
						{/* todo: img */}
					</div>
					<div className="info-con">
						<div className="name">
							<TextField
								className="info-input"
								variant="outlined"
								label="상품 이름"
								placeholder="상품 이름"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								value={prodName}
								onChange={(e: any) => setProdName(e.target.value)}
							/>
						</div>
						<div className="price">
							<div className="sub-title">가격</div>
							<TextField className="info-input" label="가격" value={price} onChange={handlePriceChange} />
						</div>
						<div className="type">
							<div className="sub-title">분류</div>
							<FormControl>
								<InputLabel id="select-label">상품 타입</InputLabel>
								<Select
									className="info-input"
									labelId="select-label"
									value={prodType}
									onChange={(e: any) => setProdType(e.target.value)}
								>
									{
										productType.map((type) => {
											return (
												<MenuItem key={type.code_id} value={type.code_id}>{type.code_name}</MenuItem>
											)
										})
									}
								</Select>
							</FormControl>
						</div>
						<div className="limit">
							<div className="sub-title">재고</div>
							<TextField className="info-input" label="재고" value={limit} onChange={handleLimitChange} />
						</div>
						<div className="contents">
							<TextField
								label="상품 설명"
								variant="outlined"
								placeholder="상품 설명"
								inputProps={{ maxLength: 1000 }}
								InputLabelProps={{shrink:true}}
								multiline={true}
								rows={4}
								value={contents}
								onChange={(e: any) => setContents(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<Button variant="contained" color="primary" onClick={saveProduct}>저장</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminProductModify;