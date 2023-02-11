import { Fragment } from 'react';
import Card from './Card';
import classes from './Plans.module.css';

const Plans = function (props) {
  console.log(props);

  return (
    <Fragment>
      <div className={classes.plans}>
        {props.plans === null && (
          <h4 className={classes.message}>There are no plans yet</h4>
        )}
        {props.plans.length === 0 && (
          <h4 className={classes.message}>There are no plans yet</h4>
        )}
        {props.plans &&
          props.plans.map(plan => {
            const date = new Date(plan.date);
            const now = new Date();

            const diffTime = date - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            console.log(diffDays);

            if (diffDays === 0) {
              return (
                <Card
                  key={plan.id}
                  onDelete={props.onDelete}
                  onTaskDelete={props.onTaskDelete}
                  dayName={plan.days}
                  date={plan.specificDate}
                  text={plan.plan}
                  id={plan.id}
                  today='true'
                />
              );
            }

            // if (diffDays === 1) {
            //   return (
            //     <Card
            //       key={plan.id}
            //       onDelete={props.onDelete}
            //       onTaskDelete={props.onTaskDelete}
            //       dayName={plan.days}
            //       date={plan.specificDate}
            //       text={plan.plan}
            //       id={plan.id}
            //       tomorrow='true'
            //     />
            //   );
            // }

            if (diffDays <= 2 && diffDays >= 0) {
              return (
                <Card
                  key={plan.id}
                  onDelete={props.onDelete}
                  onTaskDelete={props.onTaskDelete}
                  dayName={plan.days}
                  date={plan.specificDate}
                  text={plan.plan}
                  id={plan.id}
                  withinThreeDays='true'
                />
              );
            }

            if (diffDays < 0) {
              return (
                <Card
                  key={plan.id}
                  onDelete={props.onDelete}
                  onTaskDelete={props.onTaskDelete}
                  dayName={plan.days}
                  date={plan.specificDate}
                  text={plan.plan}
                  id={plan.id}
                  happened='true'
                />
              );
            }

            return (
              <Card
                key={plan.id}
                onDelete={props.onDelete}
                onTaskDelete={props.onTaskDelete}
                dayName={plan.days}
                date={plan.specificDate}
                text={plan.plan}
                id={plan.id}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default Plans;
