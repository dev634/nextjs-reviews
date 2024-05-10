import { writeFileSync } from "node:fs";
import qs from "qs";

const url =
	"https://miraculous-basketball-9833c81dea.strapiapp.com/api/reviews?" +
	qs.stringify(
		{
			fields: ["slug", "title", "subtitle", "publishedAt"],
			populate: { image: { fields: ["url"] } },
			sort: ["updatedAt:desc"],
			pagination: { pageSize: 6, page: 1 },
		},
		{ encodeValuesOnly: true }
	);
console.log("url : ", url);
const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");
