import { h } from "preact"
import { tenbeoAuthModel } from "../../models/tenbeo-auth.model";
import { useState } from "preact/hooks";
import { applicationModel } from "../../models/application.model";


interface ISecuredAreaProps {
	user			:any
	onLoggedOut		:() => void
}

export function SecuredArea ( props:ISecuredAreaProps ) {

	const [ secureData, setSecureData ] = useState("hidden")

	function getSecuredData () {
		applicationModel.getSecuredData().then( data => {
			setSecureData( data.privateInformation )
		})
	}

	function logOut () {
		tenbeoAuthModel.logOut().then( props.onLoggedOut )
	}


	return <div>
		<h1>Secured Area</h1>
		<h3>Hello { props.user.name } <button onClick={ logOut }>Log out</button></h3>
		<p>Refresh the page, user should be connected thanks to the session cookie installed by the Tenbeo Auth Instance.</p>
		<hr />
		<br />
		<div>
			<span>Secure data : </span>
			<span><strong>{ secureData }</strong></span>
		</div>
		<br />
		<button onClick={ getSecuredData }>Click here to grab secure data from the server</button>
	</div>
}