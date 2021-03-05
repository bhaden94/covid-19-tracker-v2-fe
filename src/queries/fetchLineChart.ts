export const fetchLineChart = async (type: string, name?: string) => {
	if (name) {
		return await fetchSpecificRate(type, name);
	} else {
		return await fetchAllRate(type);
	}
};

const fetchSpecificRate = async (type: string, name: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/line_chart?name=${name}`
			: `/api/${type}/line_chart?name=${name}`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};

const fetchAllRate = async (type: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/line_chart`
			: `/api/${type}/line_chart`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};
