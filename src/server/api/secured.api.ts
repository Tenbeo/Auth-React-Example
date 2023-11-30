import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const tenbeoAuthInstanceLocation = "http://localhost:3000"

export function attachSecuredAPI ( server:FastifyInstance ) {

	server.get("/api/secured-api/get-secured-data", async (request:FastifyRequest, reply:FastifyReply) => {
		const sessionId = request.headers["tenbeo-session-id"] as string
		if ( !sessionId )
			return reply.status(403).send({ status: "invalid_session_id" })

		let verifyResponse
		try {
			const verifyRequest = await fetch(`${tenbeoAuthInstanceLocation}/api/1.0/auth/verify-session/${sessionId}`)
			verifyResponse = await verifyRequest.json()
		}
		catch (e) {
			return reply.status(500).send({ status: "cannot_contact_tenbeo_auth_instance" })
		}

		// console.log( verifyResponse );

		if ( !verifyResponse.session || !verifyResponse.user || !verifyResponse.app )
			return reply.status(500).send({ status: "invalid_tenbeo_auth_response" })

		if ( verifyResponse.session.status !== "VALIDATED" )
			return reply.status(403).send({ status: "session_not_valid" })

		if ( !verifyResponse.subscribes )
			return reply.status(403).send({ status: "user_does_not_subscribes" })

		if ( verifyResponse.app.slug !== "test" )
			return reply.status(403).send({ status: "invalid_session_application" })

		reply.send({
			privateInformation: `You are user ${verifyResponse.user.name}, the secret information is ${Date.now()} `
		})
	})
}