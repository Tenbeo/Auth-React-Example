import { fastify } from "fastify";
import fastifyCookie from "@fastify/cookie";
import { resolve } from "path";
import { attachFrontApp, getFastifyRewriteHandler } from "./utils/fastify.utils";
import { attachSecuredAPI } from "./api/secured.api";

const port = 8080

// ----------------------------------------------------------------------------- SERVER INIT & CONFIG
// Create configured fastify server
const _server = fastify({
	rewriteUrl: getFastifyRewriteHandler()
})
_server.register( fastifyCookie )

// ----------------------------------------------------------------------------- APIS
// Attach a secured API
attachSecuredAPI( _server )

// ----------------------------------------------------------------------------- APPS
// Boot up front-end application
attachFrontApp(_server, {
	root: resolve("client/"),
	baseURI: process.env.TENBEO_AUTH_CLIENT_ADMIN_BASE,
	skipRedirect: request => request.url.startsWith("/api")
})

// ----------------------------------------------------------------------------- SERVER START
// Start server
await _server.listen({ host: '0.0.0.0', port })
console.log(`Example server started on port ${port}`)
