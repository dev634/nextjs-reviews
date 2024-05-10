import { getReview, getSlugs } from "@/lib/reviews";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
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
	// console.log("[ReviewPage] slug : ", slug);
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
			<section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
				<h2 className="font-bold flex gap-2 items-center text-xl">
					<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
					Comments
				</h2>
				<CommentForm title={review.title} />
				<CommentList slug={slug} />
			</section>
		</>
	);
}
