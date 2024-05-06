import Link from "next/link";
import { getFeaturedReview } from "@/lib/reviews";
import Heading from "@/components/Heading";

export default async function HomePage() {
	const featuredReview = await getFeaturedReview();

	return (
		<>
			<Heading>Indie gamers</Heading>
			<p className="pb-3">Only the best indie games, reviewed for you.</p>
			<div className="bg-white border shadow w-80 rounded hover:shadow-xl sm:w-full">
				<Link
					className="flex flex-col sm:flex-row"
					href={`/reviews/${featuredReview.slug}`}
				>
					<img
						className="rounded-t sm:rounded-l sm:rounded-r-none"
						src={featuredReview.image}
						alt=""
						width="320"
						height="180"
					/>
					<h2 className="font-semibold font-orbitron py-2 text-center sm:px-2">
						{featuredReview.title}
					</h2>
				</Link>
			</div>
		</>
	);
}
