import Link from "next/link";
import Image from "next/image";
import { getReviews } from "@/lib/reviews";
import Heading from "../../components/Heading";

export const metadata = {
	title: "Reviews",
};

export default async function ReviewsPage() {
	const reviews = await getReviews(6);
	return (
		<>
			<Heading>Reviews</Heading>
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
