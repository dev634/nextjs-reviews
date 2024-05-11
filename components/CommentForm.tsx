import { createCommentAction } from "@/app/reviews/[slug]/actions";

export interface CommentFormProps {
	title: string;
	slug: string;
}

export default function CommentForm({
	title,
	slug,
}: Readonly<CommentFormProps>) {
	return (
		<form
			className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
			action={createCommentAction}
		>
			<p className="pb-1">
				Already played <strong>{title}</strong>? Have your say!
			</p>
			<input type="hidden" name="slug" value={slug} />
			<div className="flex">
				<label htmlFor="userField" className="shrink-0 w-32">
					Your name
				</label>
				<input
					id="userField"
					className="border px-2 py-1 rounded w-48"
					name="user"
					required
					maxLength={50}
				/>
			</div>
			<div className="flex">
				<label htmlFor="messageField" className="shrink-0 w-32">
					Your comment
				</label>
				<textarea
					id="messageField"
					className="border px-2 py-1 rounded w-full"
					name="message"
					required
					maxLength={500}
				/>
			</div>
			<button
				type="submit"
				className="bg-orange-800 rounded px-2 py-1 self-center
                     text-slate-50 w-32 hover:bg-orange-700"
			>
				Submit
			</button>
		</form>
	);
}
