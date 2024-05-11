"use server";
import type { ActionError } from "@/lib/action";
import { createComment } from "@/lib/comments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCommentAction(
	formData: FormData
): Promise<undefined | ActionError> {
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
		slug: formData.get("slug") as string,
		user: formData.get("user") as string,
		message: formData.get("message") as string,
	};
	//console.log("[CreateCommentAction][createComment] : ", data);
	const error = validate(data);
	if (error) {
		return { isError: true, message: error };
	}
	await createComment(data);

	revalidatePath(`/reviews/${data.slug}`);
	redirect(`/reviews/${data.slug}`);
}

function validate(data) {
	if (data.user.length > 50) {
		return "Name field cannot be longer than 50 characters";
	}

	if (!data.user) {
		return "Name field is required";
	}

	if (!data.message) {
		return "Comment field is required";
	}
	if (data.message.length > 500) {
		return "Comment field cannot be longer than 500 characters";
	}
}
