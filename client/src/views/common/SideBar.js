import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, Drawer, ListItem, Subheader } from 'material-ui';
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
        style={ props.location.pathname === "/" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={"/lucity"}
        primaryText="Lucity"
        style={ props.location.pathname === "/lucity" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Precise"
        style={ props.location.pathname.indexOf("/precise") >= 0 ? {color: '#FFF'} : {color: '#a7b1c2'}}
        nestedItems={[
          <ListItem
            value={"/precise/fleet"}
            primaryText="Fleet"
            style={
              props.location.pathname.indexOf("/precise/fleet") >= 0
              ? {color: '#FFF'} : {color: '#a7b1c2'}
            }
          />,
          <ListItem
            value={"/precise/fleet2"}
            primaryText="Fleet 2"
            style={ props.location.pathname === "/precise/fleet2" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
        ]}
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Ian"
        style={ props.location.pathname.indexOf("/ian") >= 0 ? {color: '#FFF'} : {color: '#a7b1c2'}}
        nestedItems={[
          <ListItem
            value={"/ian/expenses"}
            primaryText="Expenses"
            style={ props.location.pathname === "/ian/expenses" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
          <ListItem
            value={"/ian/revenues"}
            primaryText="Revenues"
            style={ props.location.pathname === "/ian/revenues" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
        ]}
      />
      <ListItem
        value={"/snow"}
        primaryText="Snow"
        style={ props.location.pathname === "/snow" ? {color: '#FFF'} : {color: '#a7b1c2'}}
      />
      <ListItem
        value={"/scada"}
        primaryText="SCADA"
        style={ props.location.pathname === "/scada" ? {color: '#FFF'} : {color: '#a7b1c2'}}
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
            style={ props.location.pathname === "/settings/users" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
          <ListItem
            value={"/settings/grid"}
            primaryText="Grid"
            style={ props.location.pathname === "/settings/grid" ? {color: '#FFF'} : {color: '#a7b1c2'}}
          />,
        ]}
      />
    </SelectableList>
  </Drawer>
));

export { SideBar };
