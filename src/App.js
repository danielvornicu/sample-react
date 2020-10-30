import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ClientListeComponent from './clients/client-liste.component';
import ClientConsultComponent from './clients/client-consult.component';
import ClientFicheComponent from './clients/client-fiche.component';
import HeaderComponent from './shared/header.component';
import FooterComponent from './shared/footer.component';
import WelcomeComponent from './home/welcome.component';

function App() {
  return (
    <div>
        <Router>
            <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ClientListeComponent}></Route>
                          <Route path = "/clients" exact component = {ClientListeComponent}></Route>
                          <Route path = "/clients/new" exact component = {ClientFicheComponent}></Route>
                          <Route path = "/clients/:id" exact component = {ClientConsultComponent}></Route>
                          <Route path = "/clients/:id/edit" exact component = {ClientFicheComponent}></Route>
                          <Route path = "/welcome" exact component = {WelcomeComponent}></Route>
                    </Switch>
                </div>
            <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
