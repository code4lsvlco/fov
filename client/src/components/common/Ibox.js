import React from 'react';

const Ibox = (props) => {
  return (
    <div className={"col-sm-" + props.width}>
      <div className="ibox">
        <div className="ibox-title">
          {props.title}
        </div>
        <div className="ibox-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export { Ibox };
