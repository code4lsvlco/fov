import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, FlatButton } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css'

const Header = () => (
  <AppBar
    title=""
    showMenuIconButton={false}
    iconElementRight={
      <Link to={`/signout`}>
        <FlatButton label="Log out" icon={<FontAwesome name='sign-out'/>} />
      </Link>}
    style={{ backgroundColor: '#fff' }}
    zDepth={1}
  />
)

export { Header };
