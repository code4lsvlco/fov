import React, { Component } from 'react';
import { DefaultLayout } from '../common'
import { FleetMuiTableURL } from './components/FleetMuiTableURL';

class Fleet extends Component {
  
  render() {
    return (
      <DefaultLayout>
        <FleetMuiTableURL
          title=""
          url="/api/fleet"
          omitKeys={["_id","__v","SyncedDates","Switches","Fleet"]}
          sortBy="AssetName"
        />
      </DefaultLayout>
    )
  }
}

export { Fleet };
