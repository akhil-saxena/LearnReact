// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InternRegister from "../src/routes/InternRegister";
import InternList from "../src/routes/InternList";
import InternDetail from "../src/routes/InternDetail";

function App() {
  const apps = [
    {
      displayName: 'Registration',
      id: 'registration',
      app: InternRegister,
      href: "/"
    },
    {
      displayName: 'Interns',
      id: 'interns',
      app: InternList,
      href: "/intern"
    },
  ]
  return (
    <div className="App">
      <header className="App-header">
      <ul className="App-nav">
       {apps.map(app => <li key={app.id} className="App-nav-item"><a href={app.href}>{app.displayName}</a></li>)}
      </ul>
      </header>
      <Router>
        <Switch>
          <Route path="/intern/:id" component={() => <InternDetail />} />
          <Route path="/intern" component={() => <InternList />} />
          <Route path="/" component={() => <InternRegister />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
