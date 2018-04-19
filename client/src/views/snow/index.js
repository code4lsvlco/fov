import React from 'react';
import { Grid, Cell } from 'material-grid';
import { Paper, Card, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui';
import { DefaultLayout } from '../common'
// http://www.colparks.com/snowcams/amcrest/amcrest1.jpg
// http://www.colparks.com/snowcams/cs1/front_exterior.jpg#1509047893418
// http://www.colparks.com/snowcams/axis/image-raw.jpg#1509047893419
// http://www.colparks.com/snowcams/ch1/cityhall1.jpg#1509047923424
const Snow = () => {
  return (
    <div>
      <DefaultLayout>
        <Grid>
          <Cell col={3}>
            <Card>
              <CardHeader title="City Hall" subtitle="Camera #1" />
              <CardMedia>
                <img src="http://www.colparks.com/snowcams/amcrest/amcrest1.jpg" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="City Hall" subtitle="Camera #2" />
              <CardMedia>
                <img src="http://www.colparks.com/snowcams/ch1/cityhall1.jpg" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="City Services" subtitle="Front Entrance" />
              <CardMedia>
                <img src="http://www.colparks.com/snowcams/cs1/front_exterior.jpg" alt="" />
              </CardMedia>
            </Card>
          </Cell>
          <Cell col={3}>
            <Card>
              <CardHeader title="City Services" subtitle="Dillon Road - Looking South" />
              <CardMedia>
                <img src="http://www.colparks.com/snowcams/axis/image-raw.jpg" alt="" />
              </CardMedia>
            </Card>
          </Cell>
        </Grid>
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
