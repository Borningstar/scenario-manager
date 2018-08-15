# TODO

- Add mongo
- Add CRM
- Add active scenarios to mongo
- Determine if worth making a wrapper for the CRM
- Test active scenario manager
- Implement active scenario manager
- Post request to trigger event

EventRunner
-> Queue Event
-> Runs queues events

ScenarioRunner
-> Trigger timer increment events
-> Trigger conditional events if condition met

Areas
-> Name
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
