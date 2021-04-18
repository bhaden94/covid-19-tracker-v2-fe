export const fetchBarChart = async (type: string, name: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/bar_chart?name=${name}`
			: `/api/${type}/bar_chart?name=${name}`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};
