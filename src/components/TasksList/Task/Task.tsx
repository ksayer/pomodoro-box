import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './Task.module.css';
import { Menu } from './Menu';
import { TaskType, updateTask } from 'store/slices/tasks';

interface ITask {
  task: TaskType;
}

export const Task = ({ task }: ITask) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.name);
  const dispatch = useDispatch();

  const onBlur = () => {
    const newName = !value ? task.name : value;
    dispatch(updateTask({ ...task, name: newName }));
    setEditing(false);
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    disabled: task.active,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      data-no-dnd={editing}
      className={`${styles.item} ${styles['item--draggable']}`}
      ref={task.active ? null : setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.item__content}>
        <div className={`${styles.counter} ${task.active ? styles['counter--active'] : ''}`}>
          {task.countPomodoro}
        </div>
        {!editing ? (
          <div className={`${styles.name}`}>{task.name}</div>
        ) : (
          <input
            data-no-dnd={false}
            style={{ outline: 'none', border: 'none' }}
            className={`${styles.input}`}
            autoFocus={true}
            onBlur={onBlur}
            type="text"
            value={value}
            onInput={e => setValue(e.currentTarget.value)}
          />
        )}
        <Menu task={task} setEditing={setEditing} />
      </div>
    </li>
  );
};
