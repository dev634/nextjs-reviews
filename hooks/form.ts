import type { FormEvent } from "react";
import type { ActionError, ActionFunction } from "@/lib/action";
import { useState } from "react";

export interface SubmissionState {
	loading: boolean;
	error: ActionError | null;
}

export type UseFormStateResult = [
	SubmissionState,
	(event: FormEvent<HTMLFormElement>) => Promise<void>
];

export function useFormState(action: ActionFunction): UseFormStateResult {
	const [state, setState] = useState<SubmissionState>({
		error: null,
		loading: false,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState({ error: null, loading: true });
		const form = e.currentTarget;
		const formData = new FormData(form);
		const result = await action(formData);
		if (result?.isError) {
			setState({ error: result, loading: false });
		} else {
			form.reset();
			setState({ error: null, loading: false });
		}
	};
	return [state, handleSubmit];
}
