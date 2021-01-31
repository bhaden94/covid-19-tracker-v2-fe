export const fetchTotals = async (id: string, type: string, name?: string) => {
	if (name) {
		return await fetchSpecificTotals(type, name);
	} else {
		return await fetchAllTotals(type);
	}
};

const fetchSpecificTotals = async (type: string, name: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/totals?name=${name}`
			: `/api/${type}/totals?name=${name}`;

	const data = await fetch(url);
    const json = await data.json();
	return json;
};

const fetchAllTotals = async (type: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/all/totals`
			: `/api/${type}/all/totals`;

	const data = await fetch(url);
    const json = await data.json();
	return json;
};
