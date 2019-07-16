import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
`;
const Column = styled.div`
    margin-left: 25px;
    width: 25%;
    display: flex;
    flex-direction: column;
    &:last-child {
        margin-right: 25px;
    }
`;
const Title = styled.div`
    box-sizing: border-box;
    background-color: ${p => p.color};
    height: 30px;
    text-align: center;
    font-size: 1.5rem;
`;
const Task = styled.div`
    display: flex;
    justify-content: space-between;
`;

function App() {
    const [columns, setColumns] = useState([
        { name: "bob", tasks: [], color: "red" },
        { name: "dillon", tasks: [], color: "blue" },
        { name: "francis", tasks: [], color: "teal" },
        { name: "alex", tasks: [], color: "orange" }
    ]);

    const addTask = person => {
        const task = window.prompt();
        const changedColumns = columns.map(column => {
            if (column.name === person) {
                return { ...column, tasks: [...column.tasks, task] };
            }
            return column;
        });
        setColumns(changedColumns);
    };

    const switchToPerson = (index, indexTo, task) => {
        const filteredTasks = columns[index].tasks.filter(t => t !== task);
        const addedTasks = [...columns[indexTo].tasks, task];
        const sliced = columns.slice();
        sliced[index].tasks = filteredTasks;
        sliced[indexTo].tasks = addedTasks;
        setColumns(sliced);
    };

    return (
        <Container>
            {columns.map((person, x) => (
                <Column key={person.name}>
                    <Title color={person.color}>{person.name}</Title>
                    {person.tasks.map((task, i) => (
                        <Task key={i}>
                            {x !== 0 && (
                                <button
                                    onClick={() =>
                                        switchToPerson(x, x - 1, task)
                                    }
                                >
                                    {"<"}
                                </button>
                            )}
                            {task}
                            {x < columns.length - 1 && (
                                <button
                                    onClick={() =>
                                        switchToPerson(x, x + 1, task)
                                    }
                                >
                                    >
                                </button>
                            )}
                        </Task>
                    ))}
                    <button onClick={() => addTask(person.name)}>
                        Add a Task
                    </button>
                </Column>
            ))}
        </Container>
    );
}

export default App;
