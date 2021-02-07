export const fetchRates = async (rate: string, type: string, name?: string) => {
	if (name) {
		return await fetchSpecificRate(rate, type, name);
	} else {
		return await fetchAllRate(rate, type);
	}
};

const fetchSpecificRate = async (
	rate: string,
	type: string,
	name: string
) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/rates/${rate}?name=${name}`
			: `/api/${type}/rates/${rate}?name=${name}`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};

const fetchAllRate = async (rate: string, type: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/rates/${rate}`
			: `/api/${type}/rates/${rate}`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};
