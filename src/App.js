import './App.css';
import Experience from './components/Experience';
import MultiSelectContainer from './components/MultiSelectContainer';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
  const suggestions = ['IIT', 'BITS', 'IIIT'];
  return (
    <div className="App">
      {/* <Experience /> */}
      {/* <div className="multiSelect"> */}
        {/* <MultiSelectContainer suggestions={suggestions}/> */}
      {/* </div> */}
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/multiselect">MultiSelect</Link>
          </li>
          <li>
            <Link to="/experience">Experience Component</Link>
          </li>
        </ul>

        <hr />

        <Switch>
        <Route exact path="/">
          Please select an option to continue
          </Route>
          <Route exact path="/multiselect">
          <Experience />
          </Route>
          <Route path="/experience">
            <div className="multiSelect">
              <MultiSelectContainer suggestions={suggestions}/>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
