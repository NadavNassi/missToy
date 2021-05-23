import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from './routes.js'
import './styles/styles.scss'

// import './App.css';
import { Header } from './cmps/Header.jsx';

export function App() {
  return (
    <div className="App main-container">
      <Router>
        <header className="full">
          <Header />
        </header>
        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </Router>
    </div>
  );
}

