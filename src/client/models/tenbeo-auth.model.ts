import { tenbeoAuthInstanceApplicationSlug, tenbeoAuthInstanceLocation } from "../../_common/config/tenbeo.config";

export const tenbeoAuthModel = {

	async createSession () {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/create/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include"
		})
		return await request.json()
	},

	async trackSession () {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/track/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include"
		})
		return await request.json()
	},

	async logOut () {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/logout/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include",
			method: "POST",
		})
		return await request.json()
	}
}