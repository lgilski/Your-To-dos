import { useState, useEffect } from 'react';

import Subtitle from './components/UI/Subtitle';
import Form from './components/Form';
import Plans from './components/Plans';

function App() {
  const [goals, setGoals] = useState([]);

  const deleteHandler = function (goalId) {
    setGoals(previousPlans => {
      const updatedGoals = previousPlans.filter(plan => plan.id !== goalId);

      return updatedGoals;
    });
  };

  const deleteTaskHandler = function (taskId, goalId) {
    setGoals(previousGoals => {
      return previousGoals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            plan: goal.plan.filter(task => task.idTask !== taskId),
          };
        }
        return goal;
      });
    });
  };

  useEffect(() => {
    const goalsFromLocalStorage = JSON.parse(localStorage.getItem('allGoals'));

    if (goalsFromLocalStorage === null) return;

    setGoals(goalsFromLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('allGoals', JSON.stringify(goals));
  }, [goals]);

  return (
    <div>
      <Subtitle />
      <Form setPlans={setGoals} />
      <Plans
        onTaskDelete={deleteTaskHandler}
        onDelete={deleteHandler}
        plans={goals}
      />
    </div>
  );
}

export default App;
