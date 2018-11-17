import React from 'react';
import { Statistic } from 'semantic-ui-react';

export default function Rating(props) {
  const { site, rating, label } = props;

  let color;
  if (site === 'cf') {
    if (rating < 1200) {
      color = 'grey';
    } else if (rating < 1400) {
      color = 'green';
    } else if (rating < 1600) {
      color = 'teal';
    } else if (rating < 1900) {
      color = 'blue';
    } else if (rating < 2200) {
      color = 'purple';
    } else if (rating < 2400) {
      color = 'orange';
    } else {
      color = 'red';
    }
  }

  if (rating && label) {
    return (
      <div style={{ padding: 10 }}>
        <Statistic color={color}>
          <Statistic.Value>{rating}</Statistic.Value>
          <Statistic.Label>{label}</Statistic.Label>
        </Statistic>
      </div>
    );
  } else {
    return null;
  }
}
