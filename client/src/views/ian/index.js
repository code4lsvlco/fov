import React from 'react';
import { DefaultLayout, DataGridURL, Row, CardBox } from '../common'

const Ian = () => {
  return (
    <div>
      <DefaultLayout>
        <div className="wrapper wrapper-content">
          <Row>
            <CardBox width="12" title="/account/descriptions/water by 501">
              <DataGridURL url='/api/ian/account/descriptions/water'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/account/segments">
              <DataGridURL url='/api/ian/account/segments'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/account/histories">
              <DataGridURL url='/api/ian/account/histories'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/accounts">
              <DataGridURL url='/api/ian/accounts'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/addresses">
              <DataGridURL url='/api/ian/addresses'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/gl/versions">
              <DataGridURL url='/api/ian/gl/versions'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/gl/versions/current">
              <DataGridURL url='/api/ian/gl/versions/current'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="12" title="/gl/journal/lineitems">
              <DataGridURL url='/api/ian/gl/journal/lineitems'/>
            </CardBox>
          </Row>
        </div>
      </DefaultLayout>
    </div>
  )
}

export { Ian };
