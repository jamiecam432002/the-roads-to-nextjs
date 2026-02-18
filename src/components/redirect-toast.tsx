'use client';

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function RedirectToast() {
	useEffect(() => {
		const message = getCookieByKey('toast');

		if (message) {
			toast.success(message);
			deleteCookieByKey('toast');
		}
		// TODO: CHECK IF THERE IS A COOKIE
	}, []);

	return null;
}
