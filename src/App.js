import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </>  
    );

    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </>
      );
    }

    return (
      <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
