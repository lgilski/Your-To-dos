import React from 'react';
import classes from './Feature.module.css';

function Feature({
  icon,
  header,
  text,
}: {
  icon: string;
  header: string;
  text: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classes['featuresElement']}>
      <ion-icon name={icon} />
      <h5 className={classes['featuresElementHeader']}>{header}</h5>
      <p className={classes['featuresElementText']}>{text}</p>
    </div>
  );
}

export default Feature;
