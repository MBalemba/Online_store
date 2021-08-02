import React, {useContext, useEffect} from 'react';
import styled from 'styled-components'
import {Toast} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Container = styled.div`
  position: fixed;
  z-index: 9999;
  right: 2rem;
  bottom: 2rem;
`


const TaskContainer = observer(() => {
    const {taskInstance} = useContext(Context)

    useEffect(() => {

        if (taskInstance.Tasks.length) {
            const newTask = taskInstance.Tasks[taskInstance.Tasks.length - 1]
            console.log('добавление таска: ', newTask.id)
            setTimeout(() => {
                taskInstance.deleteTask(newTask.id)
            }, 3000)
        }
    })


    return (
        <Container>
            {taskInstance.Tasks.map(el =>
                <TaskElem key={el.id} taskInstance={taskInstance} el={el}/>
            )}
        </Container>
    );
});


const TaskElem = ({el, taskInstance}) => {
    el.status.toLowerCase()

    return (
        <Toast animation={'true'} className={'bg-' + el.status.toLowerCase()} onClose={() => taskInstance.deleteTask(el.id)}>
            <Toast.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong className="me-auto">Сообщение</strong>
                <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{el.message}</Toast.Body>
        </Toast>
    )
};


export default TaskContainer;