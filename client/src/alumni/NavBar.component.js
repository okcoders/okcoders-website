import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './alumni.component.css';

export function NavBar(props) {
  const [auth] = useState(localStorage.getItem('token') || '');
  const breadcrumbStyle = {
    fontSize: '25px'
  }
  const authLinks = (
    <>
      <div className="logo" />
      <Breadcrumb
        selectedKeys={[props.location.pathname]}
        style={breadcrumbStyle}
      >
        <Breadcrumb.Item key="/alumni">
          <Link to="/alumni">Alumni</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/addAlumni">
          <Link to="/addAlumni">Submit</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/admin">
          <Link to="/admin">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/login">
          <Link to="/login" onClick={() => {
            localStorage.removeItem('token');
            document.location.reload();
          }}>Log Out</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )

  const guestLinks = (
    <>
      <div className="logo" />
      <Breadcrumb
        selectedKeys={[props.location.pathname]}
        style={breadcrumbStyle}
      >
        <Breadcrumb.Item key="/alumni">
          <Link to="/alumni">Alumni</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/addAlumni">
          <Link to="/addAlumni">Submit</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/login">
          <Link to="/login">Login</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
  return (
    <>
      {auth ? authLinks : guestLinks}
    </>
  )
}