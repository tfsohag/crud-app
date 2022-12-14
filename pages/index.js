import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { _arrayBufferToBase64 } from "../lib/utils";

const Products = () => {
	const [data, setData] = useState({
		isLoading: false,
		products: [],
		isError: false,
	});

	useEffect(() => {
		const fetchProducts = async () => {
			setData({ ...data, isLoading: true });
			try {
				const res = await axios.get("/products");
				setData({ ...data, products: res.data.products });
			} catch (errror) {
				setData({ ...data, isLoading: false, isError: true });
				console.log(errror);
			}
		};
		fetchProducts();
	}, []);

	return (
		<>
			<div className="products py-5 px-7">
				<h1 className="text-4xl text-center">All Products</h1>
				<div className="p-5">
					<ul className="w-full bg-orange-50">
						<li className="flex  items-center border-b border-gray-800">
							<div
								className="w-20 flex-1 px-1 py-2"
								style={{ maxWidth: "90px" }}></div>
							<div className="flex-1 px-3 py-2 font-bold">
								<h3 className="capitalize">Tittle</h3>
							</div>
							<div className="flex-1 px-3 py-2 font-bold">
								<p>Description</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	 font-bold">
								<p>Price</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	 font-bold">
								<p>Status</p>
							</div>
						</li>
						{data.isLoading && (
							<div className="py-10 text-center"> Loading</div>
						)}
						{data.isError && (
							<div className="py-10 text-center"> somthing went wrong!!</div>
						)}
						{data?.products?.length && !data?.isLoading
							? data?.products.map(
									({ title, desc, price, _id: id, img, status }) => (
										<li
											className="flex items-center border-b border-gray-800"
											key={id}>
											<div
												className="table-cell px-3 py-2 flex-1"
												style={{ maxWidth: "90px" }}>
												<Image
													className="rounded-full w-16 h-16"
													width={64}
													height={64}
													src={`data:image/png;charset=utf-8;base64,${img.img}`}
													alt=""
												/>
											</div>

											<div className="table-cell px-3 py-2 flex-1">
												<h3 className="capitalize">{title}</h3>
											</div>
											<div className="table-cell px-3 py-2 flex-1">
												<p>{desc}</p>
											</div>
											<div className="table-cell px-3 py-2 flex-1 w-40	">
												<p>${price}</p>
											</div>

											<div className="table-cell px-3 py-2 flex-1 w-40	">
												<p>{status}</p>
											</div>
										</li>
									)
							  )
							: null}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Products;
