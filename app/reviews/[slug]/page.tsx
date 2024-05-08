import { getReview, getSlugs } from "@/lib/reviews";
import { notFound } from "next/navigation";
import Image from "next/image";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";

export async function generateMetadata({ params: { slug } }) {
	const review = await getReview(slug);
	if (!review) {
		notFound();
	}
	return {
		title: review.title,
	};
}

export async function generateStaticParams() {
	const slugs = await getSlugs();
	return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({ params: { slug } }) {
	const review = await getReview(slug);
	if (!review) {
		notFound();
	}
	console.log("[ReviewPage] slug : ", slug);
	return (
		<>
			<Heading>{review.title}</Heading>
			<p className="font-semibold pb-2">{review.subtitle}</p>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{review.date}</p>
				<ShareButtons />
			</div>
			<Image
				className="rounded mb-2"
				src={review.image}
				alt=""
				width="640"
				height="360"
				priority
			/>
			<article
				className="prose prose-slate max-w-screen-sm"
				dangerouslySetInnerHTML={{ __html: review.body }}
			/>
		</>
	);
}
