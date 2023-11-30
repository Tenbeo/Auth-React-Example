import { tenbeoAuthInstanceApplicationSlug, tenbeoAuthInstanceLocation } from "../../_common/config/tenbeo.config";
import { IAuthCreateResponse, IAuthLogoutResponse, IAuthTrackResponse } from "../../_common/struct/auth.struct";

export const tenbeoAuthModel = {

	async createSession ():Promise<IAuthCreateResponse> {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/create/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include"
		})
		return await request.json()
	},

	async trackSession ():Promise<IAuthTrackResponse> {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/track/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include"
		})
		return await request.json()
	},

	async logOut ():Promise<IAuthLogoutResponse> {
		const request = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/logout/${tenbeoAuthInstanceApplicationSlug}`, {
			// Always include credentials to send session cookies
			credentials: "include",
			method: "POST",
		})
		return await request.json()
	}
}