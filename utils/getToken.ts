// utils/getToken.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const getToken = async () => {
	const session: any = await getServerSession(authOptions);
	let token;
	if (session && session.user.jwt) {
		token = session.user.jwt;
	}
	return token;
};