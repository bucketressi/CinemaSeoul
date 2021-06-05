import React, { useEffect, useState } from 'react';
import { PageTitle, Cart } from '../../Components';
import { ProductType } from '../../Main/Type';
import "../../scss/pages/store.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { ProductCard } from '../../Components';

const Store = () => {
	const [productList, setProductList] = useState<ProductType[] | undefined>(undefined);

	useEffect(() => {
		fetchAllProduct();
	}, []);

	const fetchAllProduct = () => {
		// 전체 상품 받아오기
		axios.post(`${SERVER_URL}/prod/list`, {
			page: 1,
			amount: 30,
			prod_type_code: null
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
	return (
		<div>
			<PageTitle
				title="상품 리스트 페이지"
				isButtonVisible={false}
			/>
			<Cart />
			<div className="product-list-con">
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
	)
}

export default Store;