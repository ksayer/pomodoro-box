import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Menu.module.css';
import './transition.css';
import { Icon } from 'components/Icon';
import { Dropdown } from 'components/Dropdown';
import { removeTask, TaskType, updateTask } from 'store/slices/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { IconName } from 'svg-icons';
import { getRandomString } from 'utils/randomString';
import { Modal } from 'components/Modal';
import { selectTimerStatus } from 'store/slices/timer';

type TMenuButton = {
  name: string;
  iconName: IconName;
  onClick: () => void;
};

export function Menu({
  task,
  setEditing,
}: {
  task: TaskType;
  setEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const status = useSelector(selectTimerStatus);

  const addPomodoro = () => {
    dispatch(updateTask({ ...task, countPomodoro: task.countPomodoro + 1 }));
  };

  const removePomodoro = () => {
    dispatch(updateTask({ ...task, countPomodoro: task.countPomodoro - 1 }));
  };

  const deleteTask = () => {
    setIsDeleteModalOpened(true);
  };

  const menuButtons: TMenuButton[] = [
    { name: 'Увеличить', iconName: 'plus', onClick: addPomodoro },
    { name: 'Уменьшить', iconName: 'minus', onClick: removePomodoro },
    {
      name: 'Редактировать',
      iconName: 'edit',
      onClick: () => setEditing(true),
    },
    { name: 'Удалить', iconName: 'delete', onClick: deleteTask },
  ];

  const disableBtn = (btn: TMenuButton) =>
    (btn.name === 'Уменьшить' && task.countPomodoro <= 1) ||
    (btn.name === 'Удалить' && task.active && status === 'isWork');

  return (
    <>
      <Dropdown
        button={<Icon name={'menu'} className={styles.icon} />}
        buttonStyles={styles['main-btn']}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      >
        <ul className={styles.menu}>
          {menuButtons.map(btn => (
            <button
              key={getRandomString()}
              className={styles.btn}
              onClick={btn.onClick}
              disabled={disableBtn(btn)}
            >
              <Icon name={btn.iconName} />
              <span>{btn.name}</span>
            </button>
          ))}
        </ul>
      </Dropdown>
      <Modal close={() => setIsDeleteModalOpened(false)} isModalOpened={isDeleteModalOpened}>
        <div data-no-dnd={true} className={styles.modal}>
          <span className={styles.modal__icon}></span>
          <h3 className={styles.modal__title}>Удалить задачу?</h3>
          <button
            className={`${styles['modal__first-btn']} btn btn--red`}
            onClick={() => {
              setIsDeleteModalOpened(false);
              dispatch(removeTask({ id: task.id }));
            }}
          >
            Удалить
          </button>
          <button
            className={styles['modal__second-btn']}
            onClick={() => setIsDeleteModalOpened(false)}
          >
            Отмена
          </button>
        </div>
      </Modal>
    </>
  );
}
