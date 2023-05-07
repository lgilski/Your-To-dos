import Card from './Card';
import classes from './Plans.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Plans = function (props) {
  const cards = props.plans.map(plan => {
    const date = new Date(plan.date);
    const now = new Date();

    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
      <CSSTransition key={plan.id} classNames='fade' timeout={300}>
        <Card
          key={plan.id}
          onDelete={props.onDelete}
          onTaskDelete={props.onTaskDelete}
          dayName={plan.days}
          date={plan.specificDate}
          text={plan.plan}
          id={plan.id}
          happened={diffDays < 0 ? 'true' : ''}
          withinThreeDays={
            diffDays <= 2 && diffDays >= 0 && diffDays !== 0 ? 'true' : ''
          }
          today={diffDays === 0 ? 'true' : ''}
        />
      </CSSTransition>
    );
  });

  return (
    <div className={classes.plansContainer}>
      <TransitionGroup>
        {props.plans.length === 0 && (
          <CSSTransition classNames='fade' timeout={300}>
            <h4 className={classes.message}>There are no plans yet</h4>
          </CSSTransition>
        )}
      </TransitionGroup>
      <TransitionGroup component='div' className={classes.plans}>
        {cards}
      </TransitionGroup>
    </div>
  );
};

export default Plans;
