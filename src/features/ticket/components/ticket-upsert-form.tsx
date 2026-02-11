import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { upsertTicket } from '../actions/upsert-ticket';
import { Ticket } from '@/generated/prisma/client';

type TicketUpsertFormProps = {
	ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
	return (
		<form
			action={upsertTicket.bind(null, ticket?.id)}
			className='flex flex-col gap-y-2'>
			<Label htmlFor='title'>Title</Label>
			<Input type='text' id='title' name='title' defaultValue={ticket?.title} />

			<Label htmlFor='content'>Content</Label>
			<Textarea id='content' name='content' defaultValue={ticket?.content} />

			<Button type='submit'>{ticket ? 'Update' : 'Create'}</Button>
		</form>
	);
}
