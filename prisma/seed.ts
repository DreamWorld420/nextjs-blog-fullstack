import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

const userData: Prisma.UserCreateInput[] = [
	{
		name: "Kasra",
		email: "bo.kara79@gmail.com",
		posts: {
			create: [
				{
					title: "Join the Prisma Discord",
					content: "https://pris.ly/discord",
					published: true,
				},
				{
					title: "Prisma on YouTube",
					content: "https://pris.ly/youtube",
				},
			],
		},
	},
];

export async function main() {
	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
