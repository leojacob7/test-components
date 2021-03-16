import './App.css';
import Experience from './components/Experience';
import MultiSelectContainer from './components/MultiSelectContainer';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import SearchAndAdd from './components/SearchAndAdd';

function App() {
  const suggestions = ['IIT', 'BITS', 'IIIT'];
  const userList = [
    { name: 'Vanishree Deshpande', designation: 'Hiriing Manager', email: 'vani@spottable.com', role: 'Admin Access'},
    { name: 'Chilman Mehrotra', designation: 'Recruiter', email: 'chilman@spottable.com', role: 'View Access'},
    { name: 'Anupam Choudhary', designation: 'Recruiter', email: 'anupam@spottable.com', role: 'View Access'},
  ]
  return (
    <div className="App">
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/multiselect">MultiSelect</Link>
          </li>
          <li>
            <Link to="/experience">Experience Component</Link>
          </li>
          <li>
            <Link to="/searchselect">Search and Select</Link>
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
          <Route exact path="/searchselect">
            <SearchAndAdd users={userList}/>
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
