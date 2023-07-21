import Feature from './Feature/Feature';

function Features() {
  return (
    <div className='grid grid-cols-4 gap-y-12 gap-x-8 content-center justify-items-center max-w-[1100px] m-auto text-center max-[1100px]:grid-cols-2 max-[1100px]:max-w-[600px] [&_ion-icon]:w-9 [&_ion-icon]:h-9 [&_ion-icon]:p-2 [&_ion-icon]:text-lime-green-400 [&_ion-icon]:bg-lime-green-100 [&_ion-icon]:rounded-full'>
      <Feature
        icon='albums'
        header='Todos'
        text='Cool and awesome cards as todos which contains your tasks!'
      />
      <Feature
        icon='partly-sunny'
        header='Weather'
        text='You can always look up the weather in certain places and more!'
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
