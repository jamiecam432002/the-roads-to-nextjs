'use client';

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function RedirectToast() {
	useEffect(() => {
		const showCookieToast = async () => {
			const message = await getCookieByKey('toast');
			console.log(message);

			if (message) {
				toast.success(message);
				await deleteCookieByKey('toast');
			}
			// TODO: CHECK IF THERE IS A COOKIE
		};

		showCookieToast();
	}, []);

	return null;
}
