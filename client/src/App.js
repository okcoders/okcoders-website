import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from 'react-router';
import { Alumni } from "./alumni/alumni.component.js"
import { Class } from "./admin/class.component.js"
import { AlumniDetail } from "./alumni/alumni-detail.component.js";
import AddAlumniForm from './alumni/form.js';
import Login from './alumni/login.js';
import { NavBar } from './alumni/NavBar.component';
import { Layout } from 'antd';
import PrivateRoute from './components/PrivateRoute'
import "antd/dist/antd.css";
import './App.css';
import './alumni/alumni.component.css';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    const Nav = withRouter(NavBar)
    return (
      <>
        <Router>
          <Layout>
            <Content>
              <Route path="/" exact component={Alumni} />
              <Route path="/alumni" exact component={Alumni} />
              <PrivateRoute path="/admin" exact component={Class} />
              <Route path="/alumni/:id" exact component={AlumniDetail} />
              <Route path="/addAlumni" exact component={AddAlumniForm} />
              <Route path="/login" exact component={Login} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <Nav />
              OKCoders Organization ©2018, Oklahoma City, OK
            </Footer>
          </Layout>
        </Router>
      </>
    );
  }
}

export default App;
