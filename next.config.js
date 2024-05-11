//console.log("[next.config.js] process.env: ", process.env);

/**@type {import ('next').NextConfig} */
module.exports = {
	images: {
		unoptimized: true,
		remotePatterns: [
			toRemotePattern(process.env.APP_ENV || process.env.NODE_ENV),
		],
	},
};

function toRemotePattern(env) {
	let url = "";

	console.log("[toRemotePattern] process.env: ", env);
	if (env === "preprod") {
		url = new URL(process.env.CMS_IMAGE_PATTERN_PREPROD);
		console.log("[toRemotePattern] preprod : ", url);
		return {
			protocol: url.protocol.replace(":", ""),
			hostname: url.hostname,
		};
	}

	if (env === "development") {
		url = new URL(process.env.CMS_IMAGE_PATTERN);
		console.log("[toRemotePattern] : ", url);
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
