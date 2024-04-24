import { useState } from 'react';
import './App.css';
import trashcanImage from './components/trashcan.webp';

function App() {
  const [tasks, setTasks] = useState({
    todo: ['Task 1', 'Task 2', 'Task 3'],
    ongoing: ['Task 4'],
    completed: ['Task 5'],
    trash: []
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [lastDeletedTask, setLastDeletedTask] = useState(null);

  const dragStartHandler = (e, task, type) => {
    setCurrentTask({ task, type });
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    if (card === 'trash') {
      const newTasks = { ...tasks };
      const filteredTasks = tasks[currentTask.type].filter(task => task !== currentTask.task);
      newTasks[currentTask.type] = filteredTasks;
      newTasks.trash = [currentTask.task, ...newTasks.trash];
      setTasks(newTasks);
      setLastDeletedTask(currentTask.task);
    } else if (currentTask.type !== card) {
      const newTasks = { ...tasks };
      const updatedCurrentTasks = newTasks[currentTask.type] || [];
      const updatedNewTasks = newTasks[card] || [];
      const updatedTasks = {
        ...newTasks,
        [currentTask.type]: updatedCurrentTasks.filter(task => task !== currentTask.task),
        [card]: [...updatedNewTasks, currentTask.task]
      };
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="App">
      <div className="card" id="todo" onDrop={(e) => dropHandler(e, 'todo')} onDragOver={dragOverHandler}>
        {tasks.todo.map((task, index) => (
          <div 
            key={index} 
            draggable 
            onDragStart={(e) => dragStartHandler(e, task, 'todo')} 
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragEndHandler}
          >
            {task}
          </div>
        ))}
      </div>
      <div className="card" id="ongoing" onDrop={(e) => dropHandler(e, 'ongoing')} onDragOver={dragOverHandler}>
        {tasks.ongoing.map((task, index) => (
          <div 
            key={index} 
            draggable 
            onDragStart={(e) => dragStartHandler(e, task, 'ongoing')} 
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragEndHandler}
          >
            {task}
          </div>
        ))}
      </div>
      <div className="card" id="completed" onDrop={(e) => dropHandler(e, 'completed')} onDragOver={dragOverHandler}>
        {tasks.completed.map((task, index) => (
          <div 
            key={index} 
            draggable 
            onDragStart={(e) => dragStartHandler(e, task, 'completed')} 
            onDragLeave={dragLeaveHandler}
            onDragEnd={dragEndHandler}
          >
            {task}
          </div>
        ))}
      </div>
      <div className="card" id="trash" onDrop={(e) => dropHandler(e, 'trash')} onDragOver={dragOverHandler}>
        <img className="trashcan" alt="" src={trashcanImage}></img>
        {lastDeletedTask && <p>Last Deleted Task: {lastDeletedTask}</p>}
      </div>
    </div>
  );
}

export default App;