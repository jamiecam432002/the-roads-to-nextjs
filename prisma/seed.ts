import { PrismaClient } from '@/generated/prisma/client';
import config from '../prisma.config';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
	connectionString: config.datasource?.url,
});

const prisma = new PrismaClient({ adapter });

const tickets = [
	{
		id: '1',
		title: 'Ticket 1',
		content: 'This is the first ticket from the database.',
		status: 'DONE' as const,
	},
	{
		id: '2',
		title: 'Ticket 2',
		content: 'This is the second ticket from the database.',
		status: 'OPEN' as const,
	},
	{
		id: '3',
		title: 'Ticket 3',
		content: 'This is the third ticket from the database.',
		status: 'IN_PROGRESS' as const,
	},
	{
		id: '4',
		title: 'Ticket 4',
		content: 'This is the fourth ticket from the database you dirty whore.',
		status: 'OPEN' as const,
	},
];

const seed = async () => {
	/* for (const ticket of tickets) {
		await prisma.ticket.create({
			data: ticket,
		});
	} */
	await prisma.ticket.deleteMany();
	await prisma.ticket.createMany({
		data: tickets,
	});
};

seed();
