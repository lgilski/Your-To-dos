import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import classes from './WeatherTooltip.module.css';

function WeatherTooltip({
  city,
  favorite,
  deleteWeather,
  showOnCards,
  stopShowingOnCards,
}: {
  city: string;
  favorite: string | null;
  deleteWeather: () => void;
  showOnCards: () => void;
  stopShowingOnCards: () => void;
}) {
  return (
    <div className={classes.container}>
      <button className={classes.triggerButton} id={city}>
        <ion-icon name='ellipsis-vertical' />
      </button>
      <Tooltip
        className={classes.tooltip}
        anchorSelect={`#${city}`}
        clickable
        place='right'
        openOnClick
      >
        <div className={classes.buttonsWrapper}>
          <button onClick={deleteWeather} className={classes.tooltipButton}>
            <ion-icon name='trash' /> <p>Delete</p>
          </button>
          <Link className={classes.tooltipButton} to={city}>
            <ion-icon name='stats-chart' /> <p>Details</p>
          </Link>
          {favorite !== city && (
            <button onClick={showOnCards} className={classes.tooltipButton}>
              <ion-icon name='heart' /> <p>Show on cards</p>
            </button>
          )}
          {favorite === city && (
            <button
              onClick={stopShowingOnCards}
              className={classes.tooltipButton}
            >
              <ion-icon name='heart-dislike' />
              <p> Stop showing on cards</p>
            </button>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default WeatherTooltip;
