import "server-only";
import { marked } from "marked";
import qs from "qs";

export const CACHE_TAG_REVIEWS = "reviews";

export async function getReview(slug) {
	const { data } = await fetchReviews({
		filters: { slug: { $eq: slug } },
		fields: ["slug", "title", "subtitle", "publishedAt", "body"],
		populate: { image: { fields: ["url"] } },
		pagination: { pageSize: 1, withCount: false },
	});

	if (data.length === 0) {
		return null;
	}

	const item = data[0];
	return {
		...toReview(item),
		body: marked(item.attributes.body),
	};
}

/*
    slug: 'hellblade',
    title: 'Hellblade',
    date: '2023-05-06',
    image: '/images/hellblade.jpg',
    body: '<p>This is the review for <strong>hellblade</strong>.</p>\n'
*/
export async function getReviews(pageSize, page) {
	const { data, meta } = await fetchReviews({
		fields: ["slug", "title", "subtitle", "publishedAt"],
		populate: { image: { fields: ["url"] } },
		sort: ["updatedAt:desc"],
		pagination: { pageSize, page },
	});
	//console.log("[getReviews] fetchReviews : ", data);
	return {
		pageCount: meta.pagination.pageCount,
		reviews: data.map(toReview),
	};
}

export async function searchReviews(query) {
	const { data } = await fetchReviews({
		filters: {
			title: {
				$containsi: query,
			},
		},
		fields: ["slug", "title"],
		sort: ["title"],
		pagination: { pageSize: 5 },
	});
	return data.map(({ attributes }) => ({
		title: attributes.title,
		slug: attributes.slug,
	}));
}

export async function getSlugs() {
	const { data } = await fetchReviews({
		fields: ["slug"],
		sort: ["updatedAt:desc"],
		pagination: { pageSize: 100 },
	});
	return data.map((item) => item.attributes.slug);
}

async function fetchReviews(parameters) {
	const url =
		`${makeEnvUrl(process.env)}/api/reviews?` +
		qs.stringify(parameters, { encodeValuesOnly: true });
	console.log("[fetchReviews] url : ", url);
	const response = await fetch(url, {
		next: {
			tags: [CACHE_TAG_REVIEWS],
		},
	});
	if (!response.ok) {
		throw new Error(`CMS returned ${response.status} for ${url}`);
	}
	return await response.json();
}

function toReview(item) {
	const { attributes } = item;
	if (process.env.NODE_ENV === "development") {
		if (process.env.APP_ENV === "preprod") {
			return {
				title: attributes.title,
				subtitle: attributes.subtitle,
				slug: attributes.slug,
				date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
				image: attributes.image.data.attributes.url,
			};
		}
		return {
			title: attributes.title,
			subtitle: attributes.subtitle,
			slug: attributes.slug,
			date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
			image: process.env.CMS_URL + attributes.image.data.attributes.url,
		};
	}
}

function makeEnvUrl(envVariables) {
	if (envVariables.NODE_ENV === "development" && !envVariables.APP_ENV) {
		return envVariables.CMS_URL;
	}

	return envVariables.CMS_URL_PROD;
}
