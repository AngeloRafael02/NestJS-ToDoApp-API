# NestJS-ToDoApp-API
Backend and API form my Angular ToDoApp Project

## Quick view of Current Paths
id = number, table = string 

| Path  | Sub-path            | Request |   Status   | Description |
|-------|---------------------|---------|------------|-------------|
| /     | /                   | GET     | Unfinished |Introduces the API and docs|
| /task | /                   | GET     | Unfinished |Gets information about the '/task' Path|
|       | /(id)               | GET     | Finished   |Gets an existing task based in id number|
|       | /                   | POST    | Finished   |Creates a new task|
|       | /(id)               | PUT     | Finished   |Update an existing task based on id number|
|       | /(id)               | DELETE  | Finished   |Deletes a singel task based on id number|
|       | /all/(id)           | GET     | Finished   |Get All Tasks (excluding Finished and Cancelled) Based in id number|
|       | /allFinished/(id)   | GET     | Finished   |Get All Finished Tasks Based in id number|
|       | /allCancelled/(id)  | GET     | Finished   |Get All Cancelled Tasks Based in id number|
|       | /finish/(id)        | PUT     | Finished   |Mark a single task as 'Finished'|
|       | /cancel/(id)        | PUT     | Unfinished |Mark a single task as 'Canceled'|
| /misc | /                   | GET     | Unfinished |Gets information about the '/misc' Path|
|       | /allCat             | GET     | Finished   |Get all categories. Used Mostly for Categories Selections|
|       | /allCond            | GET     | Finished   |Get all conditions/status, Used mostly for Status Selections|
|       | /allThreats         | GET     | Finished   |Get all Threats Levels, Used mostly for Threat Level Selections|
|       | /col/(table)        | GET     | Finished   |Gets all Column names for given Table, Used mostly for Table Headers|
|       | /catGrouped/(id)    | GET     | Finished   |Gets Count of Tasks Depending based on Categories|
|       | /statGrouped/(id)   | GET     | Finished   |Gets Count of Tasks Depending based on Conditions|
|       | /threatGrouped/(id) | GET     | Finished   |Gets Count of Tasks Depending based on Threat Level|