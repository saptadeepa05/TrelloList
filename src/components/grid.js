import "antd/dist/antd.css";
import { Row, Col } from "antd";
import GridContent from "./content";

const Grid = ({ list, deleteList, addTask, deleteTask, tasks }) => {
  return (
    <div>
      <Row justify="start" wrap={false}>
        {list.map((listItem) => (
          <Col span={4} key={listItem.id}>
            <GridContent
              listItem={listItem}
              addTask={addTask}
              deleteTask={deleteTask}
              tasks={tasks[listItem.id]}
              deleteList={(id) => deleteList(id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Grid;
