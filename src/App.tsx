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
import PresenterQuestionPage from "./pages/PresenterQuestionPage";
import UserQuestionPage from "./pages/UserQuestionPage";
import UserResultPage from "./pages/UserResultPage";
import PresenterResultPage from "./pages/PresenterResultPage";
import PresenterRankingPage from "./pages/PresenterLeaderboardPage";

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/presenterQuestion">
					<PresenterQuestionPage
						answers={{
							red: "A",
							blue: "B",
							yellow: "C",
							green: "D"
						}}
						remainingTime={12}
						submittedAnswers={23}
						totalUsers={30}
					/>
				</Route>

				<Route exact path="/userQuestion">
					<UserQuestionPage
						answers={{
							red: "A",
							blue: "B",
							yellow: "C",
							green: "D"
						}}
						remainingTime={12}
						username="Username"
						score={25}
					/>
				</Route>

				<Route exact path="/userResult">
					<UserResultPage thisScore={5} totScore={25} pos={4} username="Username" />
				</Route>

				<Route exact path="/presenterResult">
					<PresenterResultPage
						votes={{
							red: 4,
							yellow: 3,
							blue: 6,
							green: 8
						}}
						answers={{
							red: "A",
							blue: "B",
							yellow: "C",
							green: "D"
						}}
						correctVote="yellow"
					/>
				</Route>

				<Route exact path="/presenterRanking">
					<PresenterRankingPage
						ranking={[
							"Prova",
							"Ciao",
							"Utente",
							"Pippo",
							"Mario",
							"Tizio",
							"Caio",
							"Sempronio",
							"Buh",
							"Test",
							"Ultimo",
							"Prova nome lungo",
							"Help",
							"Nome123",
							"Quindicesimo",
							"Prova",
							"Ciao",
							"Utente",
							"Pippo",
							"Mario",
							"Tizio",
							"Caio",
							"Sempronio",
							"Buh",
							"Test",
							"Ultimo",
							"==> Max 22 caratteri <==",
							"Help",
							"Nome123",
							"Non più quindicesimo",
						]}
					/>
				</Route>

				<Route>
					<Redirect to="/presenterRanking" />
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;
