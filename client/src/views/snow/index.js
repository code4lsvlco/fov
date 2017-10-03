import React from 'react';
import { Grid, Cell } from 'material-grid';
import { Paper, Card, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui';
import { DefaultLayout } from '../common'

const Snow = () => {
  return (
    <div>
      <DefaultLayout>
        <Grid>
          <Cell col={3}>
            <Card>
              <CardHeader title="McCaslin Boulevard" subtitle="Looking West" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036W043-05-W.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="McCaslin Boulevard" subtitle="Looking East" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036W043-05-E.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="Davidson Mesa" subtitle="Looking West" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E041-85-W.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="Davidson Mesa" subtitle="Looking East" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E041-85-E.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={3}>
            <Card>
              <CardHeader title="88th" subtitle="Looking West" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E044-35-W.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="88th" subtitle="Looking East" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E044-35-E.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="0.4 mile East of 88th" subtitle="Looking West" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E044-90-W.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="0.4 mile East of 88th" subtitle="Looking East" />
              <CardMedia>
                <img src="http://i.cotrip.org/dimages/camera?imageURL=remote/CTMCCAM036E044-90-E.jpg&v=00534" alt="" />
              </CardMedia>
            </Card>
          </Cell>
        </Grid>
      </DefaultLayout>
    </div>
  )
}

export { Snow };
