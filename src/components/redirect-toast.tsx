'use client';

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function RedirectToast() {
	// you can use usePathname to easily store the path and the
	// useEffect hook dependency array to have something happen
	// every time it changes!

	const pathname = usePathname();
	useEffect(() => {
		const showCookieToast = async () => {
			const message = await getCookieByKey('toast');

			if (message) {
				toast.success(message);
				await deleteCookieByKey('toast');
			}
			// TODO: CHECK IF THERE IS A COOKIE
		};

		showCookieToast();
	}, [pathname]);

	return null;
}
