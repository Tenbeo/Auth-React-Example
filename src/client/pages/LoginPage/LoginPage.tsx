import { h } from "preact"
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { tenbeoAuthModel } from "../../models/tenbeo-auth.model";

// Time interval to track login status, in seconds
const trackInterval = 1

interface ILoginProps {
	onLoggedIn?: ( sessionId:string, user ) => any
}

export function LoginPage ( props:ILoginProps ) {

	// Login QR-Code image as dataurl
	const [ qr, setQR ] = useState()

	const trackIntervalID = useRef<any>()

	useLayoutEffect( () => {
		// First, send the request to create a new session
		tenbeoAuthModel.createSession().then( r => {
			// User is already logged
			if ( r.session.status === "VALIDATED" )
				props.onLoggedIn( r.session.id, r.user )
			// User has not logged, show the QR-Code
			else if ( r.session.status === "PENDING" ) {
				trackSessionWithDelay()
				setQR( r.login.qr )
			}
		})
		return () => clearInterval( trackIntervalID.current )
	}, [] );

	// Start a new track update with a delay
	const trackSessionWithDelay = () => {
		trackIntervalID.current = setTimeout(trackSession, trackInterval * 1000)
	}

	// Track session status
	async function trackSession () {
		const r = await tenbeoAuthModel.trackSession()
		// User has logged-in
		if ( r.session.status === "VALIDATED" )
			props.onLoggedIn( r.session.id, r.user )
		// User still not logged, wait and retry
		else
			trackSessionWithDelay()
	}

	return <div>
		{ qr ? <img src={ qr } /> : "Loading ..."}
	</div>
}