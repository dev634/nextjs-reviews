import { db } from "./db";
import type { Comment } from "@prisma/client";

export type CreateCommentData = Omit<Comment, "id" | "postedAt">;

export async function createComment({
	slug,
	user,
	message,
}: CreateCommentData) {
	return await db.comment.create({
		data: {
			slug,
			user,
			message,
		},
	});
}

export async function getComments(slug) {
	return await db.comment.findMany({
		where: {
			slug,
		},
		orderBy: { postedAt: "desc" },
	});
}
