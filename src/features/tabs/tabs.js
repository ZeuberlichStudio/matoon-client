import React from 'react';
import './tabs.scss'

export function Tabs({ children, className}) {

    const [selectedTab, setSelectedTab] = React.useState(0);

    function changeTab(i) {
        if ( i === selectedTab ) return;
        setSelectedTab(i);
    }

    const renderTab = (child, i) => (
        <button onClick={ () => changeTab(i) } className={ selectedTab === i ? 'active' : null } key={i}>
            <span>{ child.props.title }</span>
        </button>
    );

    return (
        <div className={`tabs ${className}`}>
            <div className="tabs_controls">
                { children.map( renderTab ) }
            </div>
            <div className="tabs_content">
                { children[selectedTab] }
            </div>
        </div>
    );
}

export function Tab({ children }) {
    return (
        <div className="tab-container">
            { children }
        </div>
    );
}