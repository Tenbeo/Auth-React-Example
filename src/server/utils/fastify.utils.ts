import { IncomingMessage } from "node:http";
import { FastifyInstance } from "fastify";
import fastifyStatic, { FastifyStaticOptions } from "@fastify/static";

// ----------------------------------------------------------------------------- REWRITE

export type TFastifyRewriteHandler = (request:IncomingMessage) => string

let _rewriteHandlers:TFastifyRewriteHandler[] = []

export function registerFastifyRewrite ( handler:TFastifyRewriteHandler ) {
	_rewriteHandlers.push( handler )
	return () => {
		_rewriteHandlers = _rewriteHandlers.filter( h => h !== handler )
	}
}

export function getFastifyRewriteHandler ():TFastifyRewriteHandler {
	return request => {
		for ( const handler of _rewriteHandlers ) {
			const r = handler( request )
			if ( typeof r === "string" )
				return r
		}
		return request.url;
	}
}

// ----------------------------------------------------------------------------- FRONT APPS

interface IAttachFrontAppOptions {
	root			:string
	baseURI			?:string
	skipRedirect	?:( request:IncomingMessage ) => boolean
}

let _isFirst = true

export function attachFrontApp ( server:FastifyInstance, options:IAttachFrontAppOptions, fastifyOptions?:FastifyStaticOptions ) {
	options.baseURI ??= "/"
	server.register(fastifyStatic, {
		list: false,
		dotfiles: 'deny',
		...fastifyOptions,
		decorateReply: _isFirst,
		root: options.root,
		prefix: options.baseURI,
	})
	registerFastifyRewrite( request => {
		if ( options.skipRedirect && options.skipRedirect(request) )
			return
		if ( request.url.startsWith( options.baseURI ) && !request.url.includes(".") )
			return `${options.baseURI}/index.html`
	})
	_isFirst = false
}

