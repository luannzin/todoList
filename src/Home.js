import React from "react";
import styles from "./css/Home.module.css";

const Home = () => {
  const [todoItem, setTodoItem] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);

  const handleLoad = () => {
    if (localStorage.getItem("todoList")) {
      let LocalList = JSON.parse(localStorage.getItem("todoList"));
      setTodoList(LocalList);
    }
  };

  const handleSave = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSave();
    }
  }, [todoList]);

  const handleChange = (e) => {
    setTodoItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoItem !== "") {
      setTodoList([...todoList, { todo: todoItem, status: "Pendente" }]);
      setTodoItem("");
    } else {
      return;
    }
  };

  const handleUpdate = (e) => {
    let indexTodo = e.target.parentNode.parentNode.id;
    let newArr = [...todoList];
    if (newArr[indexTodo].status === "Pendente") {
      newArr[indexTodo].status = "Concluído";
    } else {
      newArr[indexTodo].status = "Pendente";
    }
    setTodoList(newArr);
  };

  const handleDelete = (e) => {
    let indexTodo = e.target.parentNode.parentNode.id;
    let newArr = [...todoList];
    newArr.splice(indexTodo, 1);
    setTodoList(newArr);
    handleSave();
    console.log(newArr);
  };

  return (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="todoInsert">Insira uma nova tarefa:</label>
        <input
          type="text"
          name=""
          id="todoInsert"
          value={todoItem}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      <div className={styles.todoContainer}>
        <table>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
          {todoList.length > 0 ? (
            todoList.map((item, index) => {
              return (
                <tr id={index} key={index}>
                  <td>
                    {item.status === "Pendente" ? (
                      index + 1 + ". " + item.todo
                    ) : (
                      <del>{index + 1 + ". " + item.todo}</del>
                    )}
                  </td>
                  <td
                    className={
                      item.status === "Pendente"
                        ? styles.pending
                        : styles.finished
                    }
                  >
                    {item.status}
                  </td>
                  <td>
                    {item.status === "Pendente" ? (
                      <button onClick={handleUpdate}>Concluir</button>
                    ) : (
                      <button onClick={handleUpdate}>Desfazer</button>
                    )}
                    <button onClick={handleDelete}>Deletar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Adicione alguma tarefa...</td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
