import React from 'react';
import { Header } from '.';

const Main = (props) => {
  return (
    <div>
      <div id="page-wrapper" className="gray-bg">
        <Header />
        { props.children }
      </div>
    </div>
  )
}

export { Main };
