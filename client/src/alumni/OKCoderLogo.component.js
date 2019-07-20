import React from 'react';
import './alumni.component.css';

export function Logo(props) {
    return (
        <div style={{ width: '100%', marginTop: 64 }}>
            <h3>
                <img
                    src="http://static1.squarespace.com/static/5cffcbde02ca0c000176d75d/t/5d0bf797dee6e100016a0c1c/1561065369034/okcoders+logo.png?format=1500w"
                    alt="OKCoders Logo"
                    style={{ width: '25%' }}
                    className="logo">
                </img>
            </h3>
        </div>
    )
}