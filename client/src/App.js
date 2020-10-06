import { ApolloProvider } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { isLoggedIn, logout } from './auth';
import CompanyDetail from './CompanyDetail';
import LoginForm from './LoginForm';
import JobBoard from './JobBoard';
import JobDetail from './JobDetail';
import JobForm from './JobForm';
import NavBar from './NavBar';
import { client } from './graphql';

const App = props => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogin = () => {
    setLoggedIn({ loggedIn: true });
    //moved this redirect to LoginForm
    //router.history.push('/');
  };

  const handleLogout = () => {
    logout();
    setLoggedIn({ loggedIn: false });
    window.location.reload(false);
    //props.router.history.push('/');
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={JobBoard} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
                <Route exact path="/jobs/new" component={JobForm} />
                <Route path="/jobs/:jobId" component={JobDetail} />
                <Route>
                  <LoginForm onLogin={handleLogin}></LoginForm>
                </Route>
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
