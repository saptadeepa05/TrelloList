import React, { useState } from "react";
import { Layout } from "antd";
import { Button } from "antd";
import Grid from "./grid";
import { DragDropContext } from "react-beautiful-dnd";

const { Header, Content } = Layout;

const TrelloList = ({
  list,
  tasks,
  addList,
  deleteList,
  addTask,
  deleteTask,
  handleSwitchList,
}) => {
  const handleTaskDrag = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    console.log(
      "from:",
      source.droppableId,
      "to:",
      destination.droppableId,
      "task index:",
      source.index
    );
    handleSwitchList(source.droppableId, destination.droppableId, source.index);
  };

  const myStyle = {
    width: "100%",
    //position:"fixed",
    backgroundColor: "Dodgerblue",
  };
  const stylebutton = {
    marginLeft: "auto",
  };

  const handleClick = () => {
    const listName = prompt("Enter List Name:");
    addList(listName);
  };

  return (
    <>
      <div>
        <Layout style={{ backgroundColor: "white" }}>
          <Header style={myStyle}>
            <h1 style={{ margin: "0 0 0 auto" }}>Trello board</h1>
            <Button
              type="secondary"
              onClick={handleClick}
              style={{ marginLeft: "auto" }}
            >
              ADD LIST
            </Button>
          </Header>
          <Content>
            <DragDropContext onDragEnd={handleTaskDrag}>
              <Grid
                list={list}
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteList={(id) => deleteList(id)}
              />
            </DragDropContext>
          </Content>
        </Layout>
      </div>
    </>
  );
};
export default TrelloList;
