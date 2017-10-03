import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, Drawer, ListItem } from 'material-ui';
import { SelectableList } from '.';

const SideBar = withRouter((props) => (
  <Drawer open={true} zDepth={1} containerStyle={{backgroundColor: '#2f4050'}}>
    <AppBar
      title="FOV"
      showMenuIconButton={false}
      style={{ backgroundColor: '#66bb6a' }}
      zDepth={0}
    />
    <SelectableList defaultValue={props.location.pathname}>
      <ListItem
        value={"/"}
        primaryText="Home"
        style={ props.location.pathname == "/" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={"/lucity"}
        primaryText="Lucity"
        style={ props.location.pathname == "/lucity" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={"/precise"}
        primaryText="Precise"
        style={ props.location.pathname == "/precise" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Ian"
        style={{color: '#FFF'}}
        style={ props.location.pathname.indexOf("/ian") >= 0 ? {color: '#FFF'} : {color: '#a7b1c2'}}
        nestedItems={[
          <ListItem
            value={"/ian/ian"}
            primaryText="Main"
            style={ props.location.pathname == "/ian/ian" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
        ]}
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Settings"
        style={ props.location.pathname.indexOf("/settings") >= 0 ? {color: '#FFF'} : {color: '#a7b1c2'}}
        nestedItems={[
          <ListItem
            value={"/settings/users"}
            primaryText="Users"
            style={ props.location.pathname == "/settings/users" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
        ]}
      />
      <ListItem
        value={"/grid"}
        primaryText="Grid"
        style={ props.location.pathname == "/grid" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={"/snow"}
        primaryText="Snow"
        style={ props.location.pathname == "/snow" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
    </SelectableList>
  </Drawer>
));

export { SideBar };
