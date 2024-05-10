import { db } from "./db";

type createPayload = {
	slug: string;
	message: string;
	user: string;
};

export async function createComment({ slug, user, message }: createPayload) {
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
	});
}
