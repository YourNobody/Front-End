import {Profiler} from 'react';
import {Provider} from "react-redux";
import {store} from "../store/store";
import {Alerter, Modal} from "../pageComponents/index";
import {Routes} from "./routes";
import './App.module.css';
import {BrowserRouter as Router} from 'react-router-dom';

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<Modal>
				<Alerter>
					<Router>
						<Routes/>
					</Router>
				</Alerter>
			</Modal>
		</Provider>
	);
}

export default App;