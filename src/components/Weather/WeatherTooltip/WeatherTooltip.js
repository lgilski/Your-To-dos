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
            Delete <ion-icon name='trash' />
          </button>
          <Link className={classes.tooltipButton} to={city}>
            Details <ion-icon name='stats-chart' />
          </Link>
          {favorite !== city && (
            <button onClick={showOnCards} className={classes.tooltipButton}>
              Show on cards <ion-icon name='heart' />
            </button>
          )}
          {favorite === city && (
            <button
              onClick={stopShowingOnCards}
              className={classes.tooltipButton}
            >
              Stop showing on cards
            </button>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default WeatherTooltip;
