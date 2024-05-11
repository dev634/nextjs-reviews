"use server";

import { createComment } from "@/lib/comments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCommentAction(formData) {
	// console.log("[CommentForm][action][user] : ", formData.get("user"));
	// console.log(
	// 	"[CommentForm][action][message] : ",
	// 	formData.get("message")
	// );
	if (!formData.get("user")) {
		return { isError: true, message: "User field is required" };
	}

	if (!formData.get("message")) {
		return { isError: true, message: "Message field is required" };
	}
	const data = {
		slug: formData.get("slug"),
		user: formData.get("user"),
		message: formData.get("message"),
	};
	console.log("[CreateCommentAction][createComment] : ", data);
	await createComment(data);

	revalidatePath(`/reviews/${data.slug}`);
	redirect(`/reviews/${data.slug}`);
}
