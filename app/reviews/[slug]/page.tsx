import { getReview, getSlugs } from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
	const slugs = await getSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export async function generateMetadata({ params: { slug } }) {
	const review = await getReview(slug);
	return {
		title: review.title,
	};
}

export default async function ReviewPage({ params: { slug } }) {
	const { title, date, image, body } = await getReview(slug);
	return (
		<>
			<Heading>{title}</Heading>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{date}</p>
				<ShareButtons />
			</div>
			<img
				className="rounded mb-2"
				src={image}
				alt=""
				width="640"
				height="360"
			/>
			<article
				className="prose prose-slate max-w-screen-sm"
				dangerouslySetInnerHTML={{ __html: body }}
			/>
		</>
	);
}
