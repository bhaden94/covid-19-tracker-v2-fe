export const fetchDiff = async (type: string, diff: number) => {
	const url =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_BACKEND}/api/${type}/days_difference?diff=${diff}`
			: `/api/${type}/days_difference?diff=${diff}`;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};
