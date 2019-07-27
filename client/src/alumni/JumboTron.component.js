import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './alumni.component.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Config from '../config/app.local.conf.js';

export const JumboTron = (props) => {
  return (
    <div className="jumbotron">
      <Jumbotron>
        <h1 className="display-3 jumbotron">OKCoders Alumni Page!</h1>
        <p className="lead">You can search by class or by language</p>
        <hr className="my-2" />
        <p>Contact information is on the alumni's card, to learn more about OKCoders, click below!</p>
        <Button style={{ float: 'left' }} color="primary" onClick={()=> window.open("https://okcoders.com")}>OKCoders Home Page</Button>
        <br />
        <Button style={{ margin: 48, flex: 'left' }} color="primary" onClick={()=> window.open(Config.websiteServiceUrl + "addAlumni")}>Add Yourself!</Button>
      </Jumbotron>
    </div>
  );
};