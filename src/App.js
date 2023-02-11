import { useState, useEffect } from 'react';

import Subtitle from './components/UI/Subtitle';
import Form from './components/Form';
import Plans from './components/Plans';

function App() {
  const [goals, setGoals] = useState([]);
  const [wasChanged, setWasChanged] = useState(false);

  console.log(goals);

  const deleteHandler = function (goalId) {
    setGoals(previousPlans => {
      const updatedGoals = previousPlans.filter(plan => plan.id !== goalId);

      return updatedGoals;
    });
  };

  const deleteTaskHandler = function (taskId, goalId) {
    let goalsToBeChanged = goals;

    const cardWithTheCertanTask = goalsToBeChanged.filter(
      plan => plan.id === goalId
    );

    const cardWithTheCertanTaskIndex = goalsToBeChanged
      .map(e => e.id)
      .indexOf(goalId);

    const withoutThatTask = cardWithTheCertanTask[0].plan.filter(
      task => task.idTask !== taskId
    );

    goalsToBeChanged[cardWithTheCertanTaskIndex].plan = withoutThatTask;

    setGoals(goalsToBeChanged);
    setWasChanged(true);
  };

  const rerender = useEffect(() => {
    return setWasChanged(false);
  }, [wasChanged]);

  const localStorageGet = useEffect(() => {
    const goalsFromLocalStorage = JSON.parse(localStorage.getItem('allGoals'));
    console.log(goalsFromLocalStorage);
    setGoals(goalsFromLocalStorage);
  }, []);

  const localStorageSave = useEffect(() => {
    localStorage.setItem('allGoals', JSON.stringify(goals));
  }, [wasChanged, goals]);

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
