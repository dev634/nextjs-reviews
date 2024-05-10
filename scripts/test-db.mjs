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

:
