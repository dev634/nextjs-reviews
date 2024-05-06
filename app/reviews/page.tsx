import Link from "next/link";
import { getReviews } from "@/lib/reviews";
import Heading from "../../components/Heading";

export const metadata = {
	title: "Reviews",
};

export default async function ReviewsPage() {
	const reviews = await getReviews();
	return (
		<>
			<Heading>Reviews</Heading>
			<nav>
				<ul className="flex flex-row flex-wrap gap-3">
					{reviews.map((review) => (
						<li
							key={`${review.slug}`}
							className="bg-white border w-80 shadow rounded hover:shadow-xl"
						>
							<Link href={`/reviews/${review.slug}`}>
								<img
									className="rounded-t"
									src={review.image}
									alt=""
									width="320"
									height="180"
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
