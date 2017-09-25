import React from 'react';

const Row = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        {props.children}
      </div>
    </div>
  )
}

export { Row };
