import React from 'react';
import { DefaultLayout, DataGridURL, Row, CardBox } from '../common'

const Ian = () => {
  return (
    <div>
      <DefaultLayout>
        <div className="wrapper wrapper-content">
          <Row>
            <CardBox width="12" title="/budget">
              <DataGridURL url='/api/ian/budget'/>
            </CardBox>
          </Row>
        </div>
      </DefaultLayout>
    </div>
  )
}

export { Ian };
