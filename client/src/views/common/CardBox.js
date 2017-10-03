import React from 'react';
import { Card, CardTitle } from 'material-ui';

const CardBox = (props) => (
  <div className={"col-sm-" + props.width} style={{ paddingBottom: 20 } }>
    <Card>
      <CardTitle title={props.title} />
      {props.children}
    </Card>
  </div>
)

export { CardBox }

// var elem = document.getElementById("myvideo");
// if (elem.requestFullscreen) {
//   elem.requestFullscreen();
// }
