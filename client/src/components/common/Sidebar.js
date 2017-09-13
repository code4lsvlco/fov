import React from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';

// Javascripts
import '../../../node_modules/react-metismenu/dist/react-metismenu.min.js'

// import '../../../node_modules/react-metismenu/dist/react-metismenu-standart.min.css'
import '../stylesheets/react-metismenu-inspinia.css';

const content = [
  {
    icon: 'home',
    label: 'Home',
    to: '',
  },
  {
    icon: 'tint',
    label: 'IAN',
    content: [
      {
        icon: 'tint',
        label: 'Water',
        to: 'water',
      },
      {
        icon: 'tint',
        label: 'Wastewater',
        to: 'wastewater',
      },
      {
        icon: 'tint',
        label: 'Stormwater',
        to: 'stormwater',
      },
    ],
  },
  {
    icon: 'tint',
    label: 'Precise',
    to: 'precise',
  }
];

const Sidebar = () => {
  return (
    <nav className="navbar-default navbar-static-side">
      <MetisMenu activeLinkLabel content={content} LinkComponent={RouterLink} />
    </nav>
  )
}

export { Sidebar };
