import React from 'react';

const PercentCompleteYTD = (props) => {
  const green = "#90EE90";
  const salmon = "#FA8072";
  const color = props.value > 100 ? salmon : green;
  const percentComplete = props.value;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const percent_ytd = day/365 * 100;

  return (
    <div className="progress" style={{marginTop: 20}}>
      <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${percentComplete > 100 ? 100 : percentComplete}%`, backgroundColor: color, color: '#666'}}>
        <span style={{paddingLeft: 5}}>{percentComplete}%</span>
      </div>
      <div style={{position: 'relative', top: 0, left: `${percent_ytd}%`, height: '100%', width: 2, backgroundColor: 'black', opacity: 0.5}}></div>
    </div>
  );
}

export { PercentCompleteYTD }
