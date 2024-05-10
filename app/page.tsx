import Link from "next/link";
import Image from "next/image";
import { getReviews, makeImageUrl } from "@/lib/reviews";
import Heading from "@/components/Heading";

export default async function HomePage() {
	const { reviews } = await getReviews(3);

	// reviews.map((review) =>
	// 	console.log("[HomePage] slugs : ", new URL(review.image))
	// );

	return (
		<>
			<Heading>Indie gamers</Heading>
			<p className="pb-3">Only the best indie games, reviewed for you.</p>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review, index) => (
					<li
						key={review.slug}
						className="bg-white border shadow w-80 rounded hover:shadow-xl sm:w-full"
					>
						<Link
							className="flex flex-col sm:flex-row"
							href={`/reviews/${review.slug}`}
						>
							<Image
								className="rounded-t sm:rounded-l sm:rounded-r-none"
								src={
									makeImageUrl(process.env.NODE_ENV) +
									new URL(review.image).pathname.replace(
										"uploads/",
										""
									)
								}
								alt=""
								width="320"
								height="180"
								priority={index == 0}
							/>
							<div className="px-2 py-1 text-center sm:text-left">
								<h2 className="font-semibold font-orbitron">
									{review.title}
								</h2>
								<p className="hidden sm:block pt-2">
									{review.subtitle}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
