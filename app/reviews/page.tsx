import Link from "next/link";
import Image from "next/image";
import { getReviews } from "@/lib/reviews";
import Heading from "../../components/Heading";
import SearchBox from "@/components/SearchBox";
import PaginationBar from "@/components/PaginationBar";

const PAGE_SIZE = 6;

export const metadata = {
	title: "Reviews",
};

export default async function ReviewsPage({ searchParams }) {
	const page = parsePageParams(searchParams.page);
	const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

	//console.log("[ReviewsPage] page : ", page);

	return (
		<>
			<Heading>Reviews</Heading>
			<div className="flex justify-between pb-3">
				<PaginationBar
					href="/reviews"
					page={page}
					pageCount={pageCount}
				/>
				<SearchBox />
			</div>

			<nav>
				<ul className="flex flex-row flex-wrap gap-3">
					{reviews.map((review, index) => (
						<li
							key={`${review.slug}`}
							className="bg-white border w-80 shadow rounded hover:shadow-xl"
						>
							<Link href={`/reviews/${review.slug}`}>
								<Image
									className="rounded-t"
									src={review.image}
									alt=""
									width="320"
									height="180"
									priority={index == 0}
								/>
								<h2 className="font-semibold font-orbitron py-2 text-center">
									{review.title}
								</h2>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

function parsePageParams(paramValue) {
	if (paramValue) {
		const page = parseInt(paramValue);
		if (isFinite(paramValue) && page > 0) {
			return page;
		}
	}
	return 1;
}
