import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import classes from './WeatherTooltip.module.css';
import { useState } from 'react';

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
  // .buttonsWrapper {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 8px;
  // }

  // .tooltipButton,
  // .tooltipButton:link,
  // .tooltipButton:visited {
  //   display: flex;
  //   gap: 4px;
  //   align-items: center;
  //   justify-content: center;
  //   padding: 2px;
  //   font-size: var(--text-medium);
  //   color: var(--shade-orange-vivid-90);
  //   text-decoration: none;
  //   cursor: pointer;
  //   background-color: var(--tint-orange-vivid-70);
  //   border: none;
  //   transition: color 0.3s, background-color 0.3s;
  // }

  // .tooltipButton:hover,
  // .tooltipButton:active {
  //   color: var(--tint-orange-vivid-90);
  //   background-color: var(--shade-orange-vivid-50);
  // }

  // .tooltipButton ion-icon {
  //   transition: color 0.3s;
  // }

  // .tooltipButton:hover ion-icon,
  // .tooltipButton:active ion-icon {
  //   color: crimson;
  // }

  // .container {
  //   position: absolute;
  //   top: 4px;
  //   right: 4px;
  // }

  // .container .tooltip {
  //   z-index: 3;
  //   padding: 8px;
  //   color: #222;
  //   background-color: var(--tint-orange-vivid-10);
  //   box-shadow: var(--shadow-s);

  //   /* transition: all 0.3s; */
  //   /* background-color: rgb(255, 153, 0); */
  // }

  return (
    <div className={'absolute top-1 right-1'}>
      <button
        className={
          'inline-block w-8 h-8 p-1 cursor-pointer border-none rounded-full [&_ion-icon]:w-full [&_ion-icon]:h-full bg-transparent'
        }
        id={city}
      >
        <ion-icon name='ellipsis-vertical' />
      </button>
      <Tooltip
        className={
          'z-[3] p-2 text-orange-vivid-800 bg-orange-vivid-200'
        }
        anchorSelect={`#${city}`}
        clickable
        place='right'
        openOnClick
      >
        <div className={classes.buttonsWrapper}>
          <button
            onClick={deleteWeather}
            className={classes.tooltipButton}
          >
            <ion-icon name='trash' /> <p>Delete</p>
          </button>
          <Link className={classes.tooltipButton} to={city}>
            <ion-icon name='stats-chart' /> <p>Details</p>
          </Link>
          {favorite !== city && (
            <button
              onClick={showOnCards}
              className={classes.tooltipButton}
            >
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
