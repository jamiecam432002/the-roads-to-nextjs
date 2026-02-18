import { useEffect, useRef } from 'react';
import { ActionState } from '../utils/to-action-state';

type useActionFeedbackOptions = {
	onSuccess?: ({ actionState }: { actionState: ActionState }) => void;
	onError?: ({ actionState }: { actionState: ActionState }) => void;
};

export default function useActionFeedback(
	actionState: ActionState,
	options: useActionFeedbackOptions,
) {
	const prevTimestamp = useRef(actionState.timestamp);
	const isUpdate = prevTimestamp.current !== actionState.timestamp;

	useEffect(() => {
		if (!isUpdate) return;

		if (actionState.status === 'SUCCESS') {
			options.onSuccess?.({ actionState });
		}

		if (actionState.status === 'ERROR') {
			options.onError?.({ actionState });
		}

		prevTimestamp.current = actionState.timestamp;
	}, [isUpdate, actionState, options]);
}
