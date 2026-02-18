'use server';

import { z } from 'zod';
import { ticketsPath, ticketPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
	ActionState,
	fromErrorToActionState,
	toActionState,
} from '@/components/form/utils/to-action-state';
import { setCookieByKey } from '@/actions/cookies';

const upsertTicketSchema = z.object({
	title: z.string().min(1).max(191),
	content: z.string().min(1).max(1024),
});

export async function upsertTicket(
	id: string | undefined,
	_actionState: ActionState,
	formData: FormData,
) {
	try {
		const data = upsertTicketSchema.parse({
			title: formData.get('title'),
			content: formData.get('content'),
		});

		await prisma.ticket.upsert({
			where: {
				id: id || '',
			},
			update: data,
			create: data,
		});
	} catch (error) {
		// return { message: 'Something went wrong', payload: formData };
		return fromErrorToActionState(error, formData);
	}

	revalidatePath(ticketsPath());
	if (id) {
		await setCookieByKey('toast', 'Ticket updated');
		console.log('ticket updated');
		redirect(ticketPath(id));
	}
	return toActionState('SUCCESS', 'Ticket created');
}
