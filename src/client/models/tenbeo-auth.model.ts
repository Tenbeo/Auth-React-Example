


let _tenbeoAuthInstanceLocation = ""

let _tenbeoAuthApplicationSlug = ""

export const tenbeoAuthModel = {

	/**
	 * Endpoint to Tenbeo Auth Instance.
	 * Ex :
	 * - http://localhost:3000 if testing with a local instance running in dev mode.
	 * - https://tenbeo-auth.my-corp.com if testing with a deployed instance.
	 */
	get nodeAuthInstanceLocation () { return _tenbeoAuthInstanceLocation },
	set tenbeoAuthInstanceLocation ( value:string ) {
		_tenbeoAuthInstanceLocation = value
	},

	/**
	 * Tenbeo Auth Application slug, created through Tenbeo Auth Admin panel.
	 */
	get nodeAuthApplicationSlug () { return _tenbeoAuthApplicationSlug },
	set tenbeoAuthApplicationSlug ( value:string ) {
		_tenbeoAuthApplicationSlug = value
	},

	async createSession () {
		const request = await fetch(`${_tenbeoAuthInstanceLocation}/api/1.0/auth/create/${_tenbeoAuthApplicationSlug}`, {
			credentials: "include"
		})
		return await request.json()
	},

	async trackSession () {
		const request = await fetch(`${_tenbeoAuthInstanceLocation}/api/1.0/auth/track/${_tenbeoAuthApplicationSlug}`, {
			credentials: "include"
		})
		return await request.json()
	},

	async logOut () {
		const request = await fetch(`${_tenbeoAuthInstanceLocation}/api/1.0/auth/logout/${_tenbeoAuthApplicationSlug}`, {
			credentials: "include",
			method: "POST",
		})
		return await request.json()
	}
}