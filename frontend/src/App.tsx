import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
import ContextProvider from "./components/Context";
import ConnectionPage from "./pages/ConnectionPage";

setupIonicReact();

const App: React.FC = () => {
	return (
		<IonApp>
			<ContextProvider
				child={
					<IonReactRouter>
						<IonRouterOutlet>
							<Route exact path="/presenter">
								<ConnectionPage userType="presenter" />
							</Route>

							<Route exact path="/user">
								<ConnectionPage userType="user" />
							</Route>

							<Route exact path="/admin">
								<ConnectionPage userType="admin" />
							</Route>

							<Route exact path="/presenterTesting">
								<ConnectionPage userType="presenter" testingButtons />
							</Route>

							<Route exact path="/userTesting">
								<ConnectionPage userType="user" testingButtons />
							</Route>

							<Route exact path="/adminTesting">
								<ConnectionPage userType="admin" testingButtons />
							</Route>

							<Route>
								<Redirect to="/user" />
							</Route>
						</IonRouterOutlet>
					</IonReactRouter>
				}
			/>
		</IonApp>
	);
};

export default App;
