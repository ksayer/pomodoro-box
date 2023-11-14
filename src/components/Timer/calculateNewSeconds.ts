import {BREAK_SECONDS, LONG_BREAK_SECONDS, POMODORO_START_SECONDS, TASKS_BETWEEN_BIG_BREAK} from "../../constants";

export const calculateNewSeconds = (isBreak: boolean, finishedTasks: number) => {
  if (!isBreak) {
    return POMODORO_START_SECONDS
  } else {
    return finishedTasks % TASKS_BETWEEN_BIG_BREAK === 0 ? LONG_BREAK_SECONDS : BREAK_SECONDS;
  }
}
