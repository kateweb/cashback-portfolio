// utils/fetchWithAuth.ts
import { signOut } from "next-auth/react";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const res = await fetch(url, options);

	if (res.status === 401) {
		await signOut({ callbackUrl: '/login' });
		return null;
	}
	return res;
}