import React from 'react';
import styles from './TasksList.module.css';
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {moveTasks, selectTasks} from "../../store/slices/tasks";
import {POMODORO_MINUTES} from "../../constants";
import {closestCenter, DndContext, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CustomMouseSensor, CustomTouchSensor} from "../../librariesCustomization/dndKit";



const getDurationString = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && !minutes) return `${hours} ч`;
  if (hours) return `${hours} ч ${minutes} минут`;
  return `${minutes} минут`;
}


export function TasksList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const minutes = tasks.reduce(
    (accumulator, currentValue) => (
      accumulator + currentValue.countPomodoro * POMODORO_MINUTES
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
          <ul className={styles.list}>
            {tasks.map((task) => <Task key={task.id} task={task}/>)}
          </ul>
        </SortableContext>
      </DndContext>
      <span className={styles['total-time']}>{minutes !== 0 && timeString}</span>
    </div>
  );
}
