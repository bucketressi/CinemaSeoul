import React, { useEffect, useState } from 'react';
import { PageTitle, Cart } from '../../Components';
import { ProductType } from '../../Main/Type';
import { useProductTypeCodeState } from '../../Main/CodeModel';
import "../../scss/pages/store.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { ProductCard } from '../../Components';
import { Tab, Tabs } from '@material-ui/core';

const Store = () => {
	const productType = useProductTypeCodeState();
	const [productList, setProductList] = useState<ProductType[] | undefined>(undefined);
	const [mode, setMode] = useState<number>(0); // 0 : 전체, 1: 굿즈, 2: 스낵

	useEffect(() => {
		fetchFromMode();
	}, [mode]);

	const fetchAllProduct = (typeString?: string) => {
		// 전체 상품 받아오기
		axios.post(`${SERVER_URL}/prod/list`, {
			page: 1,
			amount: 30,
			prod_type_code: typeString ? typeString : null
		})
			.then((res) => {
				if (!res.data || !res.data.products)
					return;
				setProductList(res.data.products);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const fetchFromMode = () => {
		let type = "";
		if (mode !== 0) {
			type = productType[mode-1].code_id;
		}

		switch (mode) {
		case 0:
			fetchAllProduct();
			break;
		case 1:
		case 2:
			fetchAllProduct(type);
			break;
		}
	}

	return (
		<div>
			<PageTitle
				title="상품 리스트 페이지"
				isButtonVisible={false}
			/>
			<Cart />
			<div className="product-list-con">
				<Tabs
					value={mode}
					onChange={(e: any, newValue: number) => {
						setMode(newValue)
					}}
					className="product-tab"
					indicatorColor="primary"
				>
					<Tab label="전체" />
					<Tab label="굿즈" />
					<Tab label="스낵" />
				</Tabs>
				<div className="contents-con">
					{
						productList &&
						productList.map((product) =>
							<ProductCard
								key={product.prod_id}
								product={product}
								auth="user"
							/>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Store;