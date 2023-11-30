
export interface IUser {
	id			:number
	name		:string
	publicKey	:string
	email		?:string
	data		?:object
}

type TSessionStatus = "PENDING" | "VALIDATED" | "EXPIRED"
export interface ISession {
	id					:string
	status				:TSessionStatus
}

interface ILogin {
	url					:string
	qr					:string
}

export interface IAuthCreateResponse {
	session ?:ISession
	login 	?:ILogin
	user 	?:IUser
}

export interface IAuthTrackResponse {
	session	?:ISession
	user	?:IUser
}
export interface IAuthLogoutResponse {
	status	?:"success"
}