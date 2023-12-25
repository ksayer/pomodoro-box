# Pomodoro box
Pomodoro box is a React-based application designed to facilitate efficient time management 
using the Pomodoro technique. The Pomodoro technique involves breaking work into intervals, 
known as "pomodoros" (typically 25 minutes), followed by a short break.

## Key Features:

#### Timer:

Users can initiate a timer for a specified duration (typically 25 minutes).
Visual representation of the remaining time.

#### Breaks:

After completing a pomodoro, the app suggests a short break (usually 5 minutes).
Option to customize break duration.

#### Pomodoro Counter:

Tracking the number of completed pomodoros.
Ability to reset the counter after task completion.

#### Settings:

Option to customize pomodoro and break durations.
Toggle sound notifications on/off.

#### Statistics:

Displaying Pomodoro technique usage statistics.
Charts reflecting user productivity.


## Setup
Assuming that you have [docker](https://docs.docker.com/get-docker/) installed

`docker build -t pomodoro-box  .`

`docker run -d --name pomodoro-box -p 3000:80 pomodoro-box`

Open the page in the browser [localhost:3000](http://localhost:3000)
