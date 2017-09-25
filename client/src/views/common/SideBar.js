import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, Drawer, ListItem } from 'material-ui';
import { SelectableList } from '.';

const SideBar = withRouter((props) => (
  <Drawer open={true} zDepth={1}>
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
      />
      <ListItem
        value={"/lucity"}
        primaryText="Lucity"
      />
      <ListItem
        value={"/precise"}
        primaryText="Precise"
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Ian"
        nestedItems={[
          <ListItem
            value={"/ian/ian"}
            primaryText="Main"
          />,
        ]}
      />
      <ListItem
        value={false}
        primaryTogglesNestedList={true}
        primaryText="Settings"
        nestedItems={[
          <ListItem
            value={"/settings/users"}
            primaryText="Users"
          />,
        ]}
      />
    </SelectableList>
  </Drawer>
));

export { SideBar };
