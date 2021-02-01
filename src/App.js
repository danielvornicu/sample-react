import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ClientListeComponent from './clients/client-liste.funct.component';
import ClientConsultComponent from './clients/client-consult.funct.component';
import ClientFicheComponent from './clients/client-fiche.funct.component';
import HeaderComponent from './shared/header.component';
import FooterComponent from './shared/footer.component';
import WelcomeComponent from './home/welcome.component';

import { ClientContextProvider } from './contexts/ClientContext';

function App() {
  return (
    <div>
        <ClientContextProvider>
            <BrowserRouter>
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
            </BrowserRouter>
        </ClientContextProvider>
    </div>
  );
}

export default App;
