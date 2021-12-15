import React, { useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import TransferList from "antd/lib/transfer/list";

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

function GridContent({ listItem, deleteList, tasks, addTask, deleteTask }) {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
  };

  const [inputData, setInputData] = useState("");

  const handleAddTask = () => {
    if (inputData === "") return;
    addTask(listItem.id, inputData);
    setInputData("");
  };

  return (
    <div>
      <Layout className="layout">
        <Header style={mystyle}>
          {listItem.name}
          <Button
            type="secondary"
            style={{ marginLeft: "auto" }}
            onClick={() => deleteList(listItem.id)}
          >
            X
          </Button>
        </Header>
        <Droppable droppableId={listItem.id.toString()} key={listItem.id}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} style={{ padding: "10px" }}>
                {tasks &&
                  tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            text={task.content}
                            onDelete={() => deleteTask(listItem.id, task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <TextArea
          placeholder="Type Here"
          autoSize
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Footer style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleAddTask}>
            <PlusOutlined />
            Add a Card
          </Button>
        </Footer>
      </Layout>
    </div>
  );
}

export default GridContent;
