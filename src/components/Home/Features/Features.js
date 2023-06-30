import Feature from './Feature/Feature';

import classes from './Features.module.css';

function Features() {
  return (
    <div className={classes.features}>
      <Feature
        icon='albums'
        header='Todos'
        text='Cool and awesome cards as todos which contains your tasks!'
      />
      <Feature
        icon='partly-sunny'
        header='Weather'
        text='You can always look up at the weather in certain places'
      />
      <Feature
        icon='cloud-done'
        header='Saving'
        text='All your cards with tasks are saved on your cool account'
      />
      <Feature
        icon='timer'
        header='Timers'
        text='You can set multiple OwO timers in sequence and edit them'
      />
      {/* <div className={classes['features-element']}>
    <ion-icon name='search-sharp'></ion-icon>
    <h5 className={classes['features-element-header']}>Search task</h5>
    <p className={classes['features-element-text']}>
      You can also search for certain task in all your todos
    </p>
  </div>
  <div className={classes['features-element']}>
    <ion-icon name='thunderstorm-sharp'></ion-icon>
    <h5 className={classes['features-element-header']}>
      Addition for cards
    </h5>
    <p className={classes['features-element-text']}>
      Weather is shown on cards in case something might change because
      of it
    </p>
  </div> */}
    </div>
  );
}

export default Features;
