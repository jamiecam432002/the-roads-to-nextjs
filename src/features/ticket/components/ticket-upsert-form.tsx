'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { upsertTicket } from '../actions/upsert-ticket';
import { Ticket } from '@/generated/prisma/client';
import { SubmitButton } from '@/components/form/submit-button';

type TicketUpsertFormProps = {
	ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
	const [actionState, action] = useActionState(
		upsertTicket.bind(null, ticket?.id),
		{
			message: '',
		},
	);
	return (
		<form action={action} className='flex flex-col gap-y-2'>
			<Label htmlFor='title'>Title</Label>
			<Input type='text' id='title' name='title' defaultValue={ticket?.title} />

			<Label htmlFor='content'>Content</Label>
			<Textarea id='content' name='content' defaultValue={ticket?.content} />
			<SubmitButton label={ticket ? 'Update' : 'Create'} />
			{actionState.message}
		</form>
	);
}
