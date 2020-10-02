import { ApolloProvider } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    props.history.push('/');
  };

  const handleLogout = () => {
    logout();
    setLoggedIn({ loggedIn: false });
    props.history.push('/');
  };

  return (
    <ApolloProvider client={client}>
      <Router ref={router => (this.router = router)}>
        <div>
          <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={JobBoard} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
                <Route exact path="/jobs/new" component={JobForm} />
                <Route path="/jobs/:jobId" component={JobDetail} />
                <Route exact path="/login" render={() => <LoginForm onLogin={handleLogin} />} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
