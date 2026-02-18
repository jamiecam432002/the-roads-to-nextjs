import useActionFeedback from './hooks/use-action-feedback';
import { toast } from 'sonner';
import { ActionState } from './utils/to-action-state';

type FormProps = {
	action: (payload: FormData) => void;
	actionState: ActionState;
	children: React.ReactNode;
};

export default function Form({ action, actionState, children }: FormProps) {
	useActionFeedback(actionState, {
		onSuccess: ({ actionState }) => {
			if (actionState.message) {
				toast.success(actionState.message);
			}
		},
		onError: ({ actionState }) => {
			if (actionState.message) {
				toast.error(actionState.message);
			}
		},
	});
	return (
		<form action={action} className='flex flex-col gap-y-2'>
			{children}
		</form>
	);
}
