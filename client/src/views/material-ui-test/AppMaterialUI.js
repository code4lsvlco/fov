import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppBar, Drawer, Menu, MenuItem, Divider, Card, CardHeader, CardText } from 'material-ui';
import {List, ListItem} from 'material-ui/List';
// import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { TextField } from "redux-form-material-ui";
import { SelectableList } from '../common';

// Stylesheets
import 'bootstrap/dist/css/bootstrap.css';
import '../stylesheets/app.css';

// muiTheme={getMuiTheme(lightTheme)}
const AppMaterialUI = (props) => {
  const classes = props.classes;

  return (
    <MuiThemeProvider >
      {/* <Grid container spacing={24}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
      </Grid> */}
      <div>
          <AppBar
            title="FOV"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={{ backgroundColor: '#FFF', zIndex: 100 }}
          />
          {/* containerStyle={{'position': 'absolute', 'top': '64px'}} */}
          <Drawer open={true}>
            <AppBar title="FOV" style={{ backgroundColor: '#66bb6a', zIndex: 200 }} iconClassNameLeft="" />
            <SelectableList />
            {/* <List>
              <ListItem primaryText="List" primaryTogglesNestedList={true} nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Starred"
                />,
                <ListItem
                  key={2}
                  primaryText="Sent Mail"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts"/>,
                  ]}
                />,
                <ListItem
                  key={3}
                  primaryText="Inbox"
                  // onNestedListToggle={this.handleNestedListToggle}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts" />,
                  ]}
                />,
              ]}/>
            </List> */}
          </Drawer>
      </div>
    </MuiThemeProvider>
  )
};

// AppMaterialUI.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(AppMaterialUI);

export default AppMaterialUI;
