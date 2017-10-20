import React, { Component } from 'react';
import { DefaultLayout } from '../common'
import { Toolbar, ToolbarGroup, Tabs, Tab } from 'material-ui'
import { FleetMuiTableURL } from './components/FleetMuiTableURL';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};

class Precise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <div>
        <DefaultLayout>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Fleet" value="a">
              <FleetMuiTableURL
                title=""
                url="/api/fleet"
                omitKeys={["_id","__v","SyncedDates","Switches","Fleet"]}
                sortBy="AssetName"
              />
            </Tab>
            <Tab label="Map" value="b">
              <div>
                <h2 style={styles.headline}>Controllable Tab B</h2>
                <p>
                  This is another example of a controllable tab. Remember, if you
                  use controllable Tabs, you need to give all of your tabs values or else
                  you wont be able to select them.
                </p>
              </div>
            </Tab>
          </Tabs>
        </DefaultLayout>
      </div>
    )
  }
}

export { Precise };
