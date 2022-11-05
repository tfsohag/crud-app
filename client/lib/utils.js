//fetch products
export async function fetchData(url) {
	let data;
	try {
		let res = await fetch(url);
		data = await res.json();
	} catch (error) {
		console.log(error.message);
	}

	return data;
}

//delete products
export async function deleteProduct(url, body) {
	let data;
	try {
		let res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		data = await res.json();
	} catch (error) {
		console.log(error.message);
	}

	return data;
}