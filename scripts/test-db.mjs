import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
	log: [{ emit: "stdout", level: "query" }],
});

// const comment = await db.comment.create({
// 	data: {
// 		slug: "stardew-valley",
// 		user: "Bob",
// 		message: "Test message 3",
// 	},
// });

// console.log("[test-db] created : ", comment);

// const comments = await db.comment.findMany();

// console.log("[test-db] selecteds : ", comments);

// const deleted = await db.comment.delete({
// 	where: {
// 		id: "b4a7487f-e121-4c6c-aed9-b62daff2de47",
// 	},
// });

// console.log("[test-db] deleted : ", deleted);
