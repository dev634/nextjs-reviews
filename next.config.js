//console.log("[next.config.js] process.env: ", process.env);

/**@type {import ('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [toRemotePattern()],
	},
};

function toRemotePattern() {
	let url = "";

	// console.log("[toRemotePattern] process.env: ", env);

	if (process.env.NODE_ENV === "development") {
		if (process.env.APP_ENV === "preprod") {
			url = new URL(process.env.CMS_IMAGE_PATTERN_PREPROD);
			console.log("[toRemotePattern][preprod] : ", url);
			return {
				protocol: url.protocol.replace(":", ""),
				hostname: url.hostname,
			};
		}
		url = new URL(process.env.CMS_IMAGE_PATTERN_PREPROD);

		return {
			protocol: url.protocol.replace(":", ""),
			hostname: url.hostname,
			port: url.port,
			pathname: url.pathname + "/**",
		};
	}

	url = new URL(process.env.CMS_IMAGE_PATTERN_PROD);
	console.log("[toRemotePattern] url : ", url);
	return {
		protocol: url.protocol.replace(":", ""),
		hostname: url.hostname,
	};
}
