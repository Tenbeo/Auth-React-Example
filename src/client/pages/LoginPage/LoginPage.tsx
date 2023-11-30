import { h } from "preact"
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { tenbeoAuthModel } from "../../models/tenbeo-auth.model";

// Time interval to track login status, in seconds
const trackInterval = 1

interface ILoginProps {
	onLoggedIn?: ( sessionId:string, user ) => any
}

export function LoginPage ( props:ILoginProps ) {
	const [ qr, setQR ] = useState()

	const trackIntervalID = useRef<any>()

	useLayoutEffect( () => {
		tenbeoAuthModel.createSession().then( r => {
			if ( r.session.status === "VALIDATED" )
				props.onLoggedIn( r.session.id, r.user )
			else if ( r.session.status === "PENDING" ) {
				trackSessionWithDelay()
				setQR( r.login.qr )
			}
		})
		return () => {
			clearInterval( trackIntervalID.current )
		}
	}, [] );

	const trackSessionWithDelay = () => {
		trackIntervalID.current = setTimeout(trackSession, trackInterval * 1000)
	}

	async function trackSession () {
		const r = await tenbeoAuthModel.trackSession()
		if ( r.session.status === "VALIDATED" )
			props.onLoggedIn( r.session.id, r.user )
		else
			trackSessionWithDelay()
	}

	return <div>
		{ qr ? <img src={ qr } /> : "Loading ..."}
	</div>
}