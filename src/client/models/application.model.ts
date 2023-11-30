



let _tenbeoSessionId:string

export const applicationModel = {

	// This model needs a valid Tenbeo session id to connect to secured data
	get tenbeSessionId () { return _tenbeoSessionId },
	set tenbeSessionId ( value:string ) {
		_tenbeoSessionId = value
	},

	async getSecuredData () {
		const request = await fetch(`/api/secured-api/get-secured-data`, {
			headers: {
				"tenbeo-session-id": _tenbeoSessionId
			}
		})
		return await request.json()
	}
}