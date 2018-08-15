# TODO

- Error support to activeScenarioManager
- Create active scenario
- Active scenario operations -> start, stop, pause, etc
- Initial teams support -> action to modify team variable, teams all have same variable set

EventRunner
-> Queue Event
-> Runs queues events

ScenarioRunner
-> Trigger timer increment events
-> Trigger conditional events if condition met

Areas
-> Name
-> Label (can be set while active? for team bases etc)
-> X, Y
-> H, W
-> Color
-> Events

Scenario-Specific
-> Start
-> Stop
-> Pause
-> Add Team
-> Remove Team

Events
-> Timer (auto-generated, periodically increments timers )
-> Conditional (checked every tick, every time state is changed?)
-> Activated (activated by user clicking on area, using button, etc)

Actions
-> Timer
--> Start X Timer
--> Start X Timer for Team
--> Stop X Timer
--> Stop X Timer for Team
--> Set X Timer to Y
--> Set X Timer to Y for Team
-> Modify Variables
--> Add X to Y
--> Add X to Y for Team
--> Subtract X from Y
--> Subtract X from Y for Team
--> Set X to Y
--> Set X to Y for Team
-> Meta
--> Chain (takes in a number of actions)

Objectives award points.

Objectives
-> Most X
-> Least X
-> X is True
-> X is False
-> X Greater Than Y
-> X Less ThanY
-> X is Y

State
-> Name
-> Objectives
-> Events
-> Variables
--> string
--> boolean
--> number
-> Timers
--> active
-> Teams
--> Name
--> Points

## Minimum

- Start Scenario from Template
- Add teams from list of premade ones
- Start/Stop/Pause scenario
- Scenario has timer
- Increment/Decrement/Set points for teams
