export function debug(name) {
	return (...rest) => {
		if (process.env.ENV === "development")
			console.log(name, ":", ...rest);
	};
}