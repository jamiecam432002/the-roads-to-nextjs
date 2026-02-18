'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { upsertTicket } from '../actions/upsert-ticket';
import { Ticket } from '@/generated/prisma/client';
import { SubmitButton } from '@/components/form/submit-button';
import FieldError from '@/components/form/field-error';
import { toast } from 'sonner';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import useActionFeedback from '@/components/form/hooks/use-action-feedback';
import Form from '@/components/form/form';

type TicketUpsertFormProps = {
	ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
	const [actionState, action] = useActionState(
		upsertTicket.bind(null, ticket?.id),
		EMPTY_ACTION_STATE,
	);

	return (
		<Form action={action} actionState={actionState}>
			<Label htmlFor='title'>Title</Label>
			<Input
				type='text'
				id='title'
				name='title'
				defaultValue={
					(actionState.payload?.get('title') as string) ?? ticket?.title
				}
			/>
			<FieldError name='title' actionState={actionState} />

			<Label htmlFor='content'>Content</Label>
			<Textarea
				id='content'
				name='content'
				defaultValue={
					(actionState.payload?.get('content') as string) ?? ticket?.content
				}
			/>
			<FieldError name='content' actionState={actionState} />

			<SubmitButton label={ticket ? 'Update' : 'Create'} />
		</Form>
	);
}
