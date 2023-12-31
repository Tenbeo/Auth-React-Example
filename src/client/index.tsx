import { h, render } from "preact";
import { useState } from "preact/hooks";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SecuredArea } from "./pages/SecuredAreaPage/SecuredAreaPage";
import { applicationModel } from "./models/application.model";
import { IUser } from "../_common/struct/auth.struct";


function App () {

	const [ loggedUser, setLoggedUser ] = useState<IUser>( null )

	function setLoginInfo ( sessionId:string, user:IUser ) {
		applicationModel.tenbeSessionId = sessionId
		setLoggedUser( user )
	}

	return <div>
		{
			// Show login page if not logged
			loggedUser === null
			? <LoginPage
				onLoggedIn={ setLoginInfo }
			/>
			// Show secured area when logged
			// Be careful to never include sensitive data in this component
			// And always use a secured API ( see component source code )
			: <SecuredArea
				user={ loggedUser }
				onLoggedOut={ () => setLoginInfo(null, null) }
			/>
		}
	</div>
}

render( <App />, document.body )