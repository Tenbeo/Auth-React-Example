import { h, render } from "preact";
import { useState } from "preact/hooks";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SecuredArea } from "./pages/SecuredAreaPage/SecuredAreaPage";
import { tenbeoAuthModel } from "./models/tenbeo-auth.model";
import { applicationModel } from "./models/application.model";

tenbeoAuthModel.tenbeoAuthInstanceLocation = "http://localhost:3000"
tenbeoAuthModel.tenbeoAuthApplicationSlug = "test"

function App () {

	const [ loggedUser, setLoggedUser ] = useState( null )

	function setLoginInfo ( sessionId:string, user ) {
		applicationModel.tenbeSessionId = sessionId
		setLoggedUser( user )
	}

	return <div>
		{
			loggedUser === null
			? <LoginPage
				onLoggedIn={ setLoginInfo }
			/>
			: <SecuredArea
				user={ loggedUser }
				onLoggedOut={ () => setLoginInfo(null, null) }
			/>
		}
	</div>
}

render( <App />, document.body )