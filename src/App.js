import React from "react";
import useLocalStorage from "./useLocalStorage";
import "./App.css";
import TrelloList from "./components/TrelloList";

// const initialList = [
//   {id: 0, name:"List 1"},
//   {id: 1,  name: "List 2"},
//   // {id: 2, name: "List 3"},
// ]

// const initialTasks = {
//   0: [
//     {id: 0, content: "task 1"},
//     {id: 1, content: "task 2"}
//   ],
//   1: [
//     {id: 2, content: "task 3"}
//   ]
// }

function App() {
  const [list, setList] = useLocalStorage("list", []);
  const [tasks, setTasks] = useLocalStorage("tasks", {});

  const addTask = (listID, task) => {
    setTasks((prevTasks) => {
      return {
        ...prevTasks,
        [listID]: [...prevTasks[listID], { id: Date.now(), content: task }],
      };
    });
  };

  const deleteTask = (listID, taskID) => {
    setTasks((prevTasks) => {
      return {
        ...prevTasks,
        [listID]: prevTasks[listID].filter((task) => task.id !== taskID),
      };
    });
  };

  const handleAddList = (listName) => {
    const listID = Date.now();
    setList((prevList) => [
      ...prevList,
      {
        name: listName,
        id: listID,
      },
    ]);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [listID]: [],
    }));
  };

  // const handleSwitchList = (fromListID, toListID, taskID) => {
  //   setTasks(prevTasks => {
  //     let tasktoSwitch
  //     const fromList = prevTasks[fromListID].filter(task => {
  //       if (task.id !== taskID) return true
  //       tasktoSwitch = task
  //       return false
  //     })

  //     return {
  //       ...prevTasks,
  //       [fromListID]: fromList,
  //       [toListID]: [
  //         ...prevTasks[toListID],
  //         tasktoSwitch
  //       ]
  //     }
  //   })
  // }
  const handleSwitchList = (fromListID, toListID, taskIdx) => {
    if (fromListID === toListID) return;
    const taskToSwitch = { ...tasks[fromListID][taskIdx] };

    setTasks((prevTasks) => {
      const newTasks = {
        ...prevTasks,
        [fromListID]: prevTasks[fromListID].filter((_, idx) => taskIdx != idx),
        [toListID]: [taskToSwitch, ...prevTasks[toListID]],
      };
      return newTasks;
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    setList((prevList) => [
      ...prevList.filter((listItem) => listItem.id !== id),
    ]);
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      delete newTasks[id];
      return newTasks;
    });
  };
  return (
    <>
      <div className="App">
        <TrelloList
          list={list}
          addList={(listName) => handleAddList(listName)}
          deleteList={(id) => handleDelete(id)}
          addTask={addTask}
          deleteTask={deleteTask}
          tasks={tasks}
          handleSwitchList={handleSwitchList}
        />
      </div>
    </>
  );
}

export default App;
