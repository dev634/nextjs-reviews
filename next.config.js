//console.log("[next.config.js] process.env: ", process.env);

/**@type {import ('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			toRemotePattern(
				process.env.APP_ENV === "preprod"
					? process.env.CMS_IMAGE_PATTERN_PROD
					: process.env.CMS_IMAGE_PATTERN
			),
		],
	},
};

function toRemotePattern(urlString) {
	const url = new URL(urlString);
	console.log("[toRemotePattern] : ", url);

	if (process.env.NODE_ENV === "development") {
		if (process.env.APP_ENV === "preprod") {
			return {
				protocol: url.protocol.replace(":", ""),
				hostname: url.hostname,
			};
		}
		return {
			protocol: url.protocol.replace(":", ""),
			hostname: url.hostname,
			port: url.port,
			pathname: url.pathname,
		};
	}

	return {
		protocol: url.protocol.replace(":", ""),
		hostname: url.hostname,
	};
}
