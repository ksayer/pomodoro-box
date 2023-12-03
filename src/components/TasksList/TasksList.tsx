import React, {createRef} from 'react';
import './transition.css';
import styles from './TasksList.module.css';
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {moveTasks, selectTasks} from "../../store/slices/tasks";
import {POMODORO_DURATION_MINUTES} from "../../constants";
import {closestCenter, DndContext, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CustomMouseSensor, CustomTouchSensor} from "../../librariesCustomization/dndKit";
import {convertSeconds} from "../../utils/convertSeconds";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const getDurationString = (totalMinutes: number) => {
  const {hours, minutes} = convertSeconds(totalMinutes * 60)
  let result = ''
  if (hours) result = `${hours} ч`;
  if (minutes) result =  `${result} ${minutes} минут`;
  return result;
}


export function TasksList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const minutes = tasks.reduce(
    (accumulator, currentValue) => (
      accumulator + currentValue.countPomodoro * POMODORO_DURATION_MINUTES
    ), 0)
  const timeString = getDurationString(minutes)


  const onDragEnd = (event: any) => {
    dispatch(moveTasks({activeId: event.active.id, overId: event.over.id}))
  }

  const sensors = useSensors(
    useSensor(CustomMouseSensor),
    useSensor(CustomTouchSensor),
  )

  return (
    <div className={styles.tasks}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
        <SortableContext strategy={verticalListSortingStrategy} items={tasks} >
            <TransitionGroup  className={styles.list}>
              {tasks.map((task) => {
                const nodeRef = createRef<HTMLDivElement>();
                return <CSSTransition
                  key={task.id}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="item"
                >
                    <div ref={nodeRef}>
                      <Task key={task.id} task={task}/>
                    </div>
                </CSSTransition>
              })}
            </TransitionGroup>
        </SortableContext>
      </DndContext>
      <span className={styles['total-time']}>{minutes !== 0 && timeString}</span>
    </div>
  );
}
