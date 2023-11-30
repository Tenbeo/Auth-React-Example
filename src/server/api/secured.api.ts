import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { tenbeoAuthInstanceApplicationSlug, tenbeoAuthInstanceLocation } from "../../_common/config/tenbeo.config";
import { ISession, IUser } from "../../_common/struct/auth.struct";

interface IVerifySessionResponse {
	session		:ISession
	user		?:IUser
	app			: {
		slug:string
	}
	subscribes	:boolean
}

export function attachSecuredAPI ( server:FastifyInstance ) {
	/**
	 * This API is an example to show how to secure access to sensitive data with Tenbeo Auth.
	 * User calling this API needs to be logged with Tenbeo Login and have a valid session ID.
	 * This session ID needs to be sent via an HTTP header.
	 * Tenbeo Session Cookie is sandboxed to the instance URL for security.
	 * It should never leak elsewhere to avoid session hijacking.
	 * ( to avoid having the session ID sent to a malicious server )
	 */
	server.get("/api/secured-api/get-secured-data", async (request:FastifyRequest, reply:FastifyReply) => {
		// Get session id from request headers
		const sessionId = request.headers["tenbeo-session-id"] as string
		if ( !sessionId )
			return reply.status(403).send({ status: "invalid_session_id" })
		// Query the Tenbeo Auth Instance to grab info about this request
		let verifyResponse
		try {
			const verifyRequest = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/verify-session/${sessionId}`)
			verifyResponse = await verifyRequest.json()
		}
		catch (e) {
			return reply.status(500).send({ status: "cannot_contact_tenbeo_auth_instance" })
		}
		// Check validity of this response
		if ( !verifyResponse.session || !verifyResponse.user || !verifyResponse.app )
			return reply.status(500).send({ status: "invalid_tenbeo_auth_response" })
		// Check if the session is still valid
		if ( verifyResponse.session.status !== "VALIDATED" )
			return reply.status(403).send({ status: "session_not_valid" })
		// Check if the user subscribes the app of the session
		if ( !verifyResponse.subscribes || verifyResponse.app.slug !== tenbeoAuthInstanceApplicationSlug )
			return reply.status(403).send({ status: "user_does_not_subscribes" })
		// Everything is fine, we can send sensitive data to the user !
		reply.send({
			privateInformation: `You are user ${verifyResponse.user.name}, the secret information is ${Date.now()} `
		})
	})
}