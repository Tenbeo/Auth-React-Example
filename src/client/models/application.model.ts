

let _tenbeoSessionId:string

export const applicationModel = {

	/**
	 * This model needs a valid Tenbeo session ID to connect to secured data
	 */
	get tenbeSessionId () { return _tenbeoSessionId },
	set tenbeSessionId ( value:string ) {
		_tenbeoSessionId = value
	},

	async getSecuredData () {
		const request = await fetch(`/api/secured-api/get-secured-data`, {
			// No need for cors credentials here but send the session ID through a header
			// so the server will be able to validate our request
			headers: {
				"tenbeo-session-id": _tenbeoSessionId
			}
		})
		return await request.json()
	}
}