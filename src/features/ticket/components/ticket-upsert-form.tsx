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
import { fromCent } from '@/utils/currency';

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

			<div className='flex gap-x-2 mb-1'>
				<div className='w-1/2'>
					<Label htmlFor='deadline'>Deadline</Label>
					<Input
						type='date'
						id='deadline'
						name='deadline'
						defaultValue={
							(actionState.payload?.get('deadline') as string) ??
							ticket?.deadline
						}
					/>
					<FieldError name='deadline' actionState={actionState} />
				</div>

				<div className='w-1/2'>
					<Label htmlFor='bounty'>Bounty ($)</Label>
					<Input
						type='number'
						step='.01'
						id='bounty'
						name='bounty'
						defaultValue={
							(actionState.payload?.get('bounty') as string) ??
							(ticket?.bounty ? fromCent(ticket?.bounty) : '')
						}
					/>
					<FieldError name='bounty' actionState={actionState} />
				</div>
			</div>

			<SubmitButton label={ticket ? 'Update' : 'Create'} />
		</Form>
	);
}
