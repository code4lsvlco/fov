import React from 'react';

const PercentComplete = (props) => {
  const green = "#90EE90";
  const salmon = "#FA8072";
  const color = props.value > 100 ? salmon : green;
  const percentComplete = props.value + '%';
  return (
    <div className="progress" style={{marginTop: 20}}>
      <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percentComplete, backgroundColor: color, color: '#666'}}>
        <span style={{paddingLeft: 5}}>{percentComplete}</span>
      </div>
    </div>
  );
}

export { PercentComplete }
