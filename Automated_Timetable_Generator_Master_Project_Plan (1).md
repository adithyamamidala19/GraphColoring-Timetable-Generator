# Automated Timetable Generator --- Master Project Plan & Roadmap

## 0. Project Identity

**Project Type:** Full-stack web application\
**Project Name:** Automated Timetable Generator\
**Core Algorithm:** Graph Coloring Algorithm + Constraint Validation +
Optimization\
**Primary Interface:** One unified application interface\
**Target:** Production-quality academic project / competition-ready
demonstration\
**UI/UX:** To be designed by the project owner; implementation must
faithfully follow the supplied UI/UX design.

------------------------------------------------------------------------

# 1. Product Vision

Build a complete web application that automatically generates academic
timetables from structured university/college data.

The application must accept all scheduling information required for a
realistic timetable, including:

-   Academic year
-   Semester
-   Department
-   Section
-   Class/group
-   Subject name
-   Subject code
-   Subject type
-   Subject credits
-   Required classes/hours per week
-   Teacher/faculty name
-   Teacher ID
-   Teacher availability
-   Teacher unavailable periods
-   Teacher preferred periods
-   Classroom
-   Classroom number/name
-   Classroom capacity
-   Classroom type
-   Laboratory information
-   Date/day
-   Time slots
-   Working days
-   Break periods
-   Lunch periods
-   Student strength
-   Section strength
-   Room availability
-   Faculty availability
-   Subject requirements
-   Lab requirements
-   Scheduling constraints
-   Soft preferences
-   Academic calendar restrictions

The system must transform this information into a timetable that is:

1.  Conflict-free with respect to hard constraints.
2.  Optimized according to configurable soft constraints.
3.  Explainable.
4.  Editable.
5.  Validatable.
6.  Exportable.
7.  Visually clear.
8.  Responsive.
9.  Reliable.
10. Easy to use.

------------------------------------------------------------------------

# 2. Important Scope Decision

There is ONE unified interface.

Do NOT build separate:

-   Student interface
-   Faculty interface
-   Admin interface

Instead, provide one complete scheduling workspace.

The single interface contains:

-   Landing page
-   Dashboard
-   Academic setup
-   Subjects
-   Teachers
-   Sections
-   Rooms
-   Time slots
-   Working days
-   Constraints
-   Timetable generator
-   Timetable viewer
-   Conflict center
-   Algorithm visualization
-   Analytics
-   Export
-   Settings

The application should feel like one coherent product.

------------------------------------------------------------------------

# 3. Product Structure

## Public Area

### 3.1 Landing Page

The project must have a dedicated landing page.

The landing page is NOT part of the dashboard.

It should contain sections such as:

1.  Hero
2.  Product introduction
3.  Problem statement
4.  How the system works
5.  Graph coloring explanation
6.  Feature showcase
7.  Timetable preview
8.  Algorithm visualization preview
9.  Constraint/optimization explanation
10. Analytics preview
11. Benefits
12. Demo/sample workflow
13. Call to action
14. Footer

The exact UI and UX will be supplied/designed by the project owner.

The development agent must implement the design faithfully.

Do not independently redesign the landing page unless explicitly
instructed.

------------------------------------------------------------------------

# 4. Main Application Navigation

Recommended unified navigation:

-   Overview
-   Timetable
-   Generator
-   Subjects
-   Teachers
-   Sections
-   Rooms
-   Time Slots
-   Constraints
-   Algorithm
-   Conflicts
-   Analytics
-   Exports
-   Settings

Navigation must remain simple and consistent.

------------------------------------------------------------------------

# 5. Landing Page Requirements

## 5.1 Hero Section

Possible content:

> Automated Timetable Generation\
> Generate optimized academic schedules using Graph Coloring and
> intelligent constraint handling.

Primary CTA:

-   Generate Timetable

Secondary CTA:

-   Explore Algorithm

The visual design will be provided separately.

## 5.2 Problem Section

Explain manual timetable problems:

-   Teacher conflicts
-   Room conflicts
-   Section conflicts
-   Lab availability
-   Time restrictions
-   Uneven workloads
-   Manual effort
-   Human errors

## 5.3 Solution Section

Explain:

Input data → Conflict graph → Graph coloring → Constraint validation →
Optimization → Final timetable.

## 5.4 Algorithm Section

Clearly communicate:

-   Vertex = class/session
-   Edge = scheduling conflict
-   Color = time slot

## 5.5 Feature Section

Show:

-   Automated generation
-   Conflict detection
-   Constraint handling
-   Optimization
-   Analytics
-   Export
-   Explainable scheduling
-   Regeneration

## 5.6 Final CTA

Provide a clear action to enter the application.

------------------------------------------------------------------------

# 6. Unified Dashboard

Dashboard should summarize the current scheduling project.

Display:

-   Academic year
-   Department
-   Semester
-   Section
-   Number of subjects
-   Number of teachers
-   Number of rooms
-   Number of sections
-   Number of time slots
-   Classes required
-   Classes scheduled
-   Hard conflicts
-   Soft violations
-   Timetable quality score
-   Room utilization
-   Faculty utilization
-   Last generation time
-   Last updated time

Quick actions:

-   Create timetable
-   Add subject
-   Add teacher
-   Add room
-   Add section
-   Configure time slots
-   Validate timetable
-   Export timetable

------------------------------------------------------------------------

# 7. Academic Configuration

The system must support complete academic configuration.

Fields:

## Academic Year

Example:

2026--2027

## Term

-   Semester 1
-   Semester 2
-   Custom

## Department

Example:

Computer Science and Engineering

## Semester

Example:

4

## Section

Example:

A

## Academic Start Date

Example:

01-07-2026

## Academic End Date

Example:

30-11-2026

## Working Days

-   Monday
-   Tuesday
-   Wednesday
-   Thursday
-   Friday
-   Saturday

Allow custom working days.

------------------------------------------------------------------------

# 8. Section Management

A section represents the student group receiving a timetable.

Each section should contain:

-   Section ID
-   Section name
-   Department
-   Semester
-   Academic year
-   Student count
-   Batch
-   Class/group name
-   Assigned subjects
-   Assigned teachers
-   Required weekly hours
-   Preferred room
-   Special restrictions

Example:

Section A - Department: CSE - Semester: 4 - Students: 62 - Batch: 2026 -
Academic year: 2026--27

Support multiple sections:

-   A
-   B
-   C
-   D

The scheduler must prevent two classes required by the same section from
occurring simultaneously.

------------------------------------------------------------------------

# 9. Subject Management

Every subject must support detailed information.

Fields:

-   Subject ID
-   Subject code
-   Subject name
-   Short name
-   Subject type
-   Department
-   Semester
-   Section
-   Credits
-   Theory hours/week
-   Lab hours/week
-   Total hours/week
-   Number of sessions/week
-   Duration per session
-   Assigned teacher
-   Alternative teacher if applicable
-   Required room type
-   Required capacity
-   Is laboratory?
-   Is elective?
-   Is mandatory?
-   Preferred days
-   Restricted days
-   Preferred times
-   Restricted times
-   Consecutive session requirement
-   Notes

Subject types:

-   Theory
-   Laboratory
-   Tutorial
-   Seminar
-   Project
-   Elective
-   Practical
-   Other

------------------------------------------------------------------------

# 10. Teacher / Faculty Management

Every teacher must have detailed information.

Fields:

-   Teacher ID
-   Teacher name
-   Employee ID
-   Department
-   Email
-   Phone if required
-   Designation
-   Subjects taught
-   Maximum classes/day
-   Maximum classes/week
-   Maximum consecutive classes
-   Available days
-   Available times
-   Unavailable days
-   Unavailable times
-   Preferred days
-   Preferred times
-   Break requirements
-   Notes

Availability must be represented at timeslot level where possible.

Example:

Dr. Kumar:

Available: Monday 9--1 Tuesday 10--4 Wednesday 9--2

Unavailable: Monday 1--2 Friday all day

The scheduler must never assign a class outside hard availability.

------------------------------------------------------------------------

# 11. Classroom / Room Management

Each room must contain:

-   Room ID
-   Room number
-   Building
-   Floor
-   Room name
-   Capacity
-   Room type
-   Department
-   Availability
-   Equipment
-   Lab status
-   Projector availability
-   Computer count
-   Special requirements
-   Restricted periods

Room types:

-   Classroom
-   Laboratory
-   Seminar Hall
-   Auditorium
-   Computer Lab
-   Physics Lab
-   Chemistry Lab
-   Other

Hard rule:

Student count must not exceed room capacity.

Lab subjects must be assigned to compatible laboratory rooms.

------------------------------------------------------------------------

# 12. Time Slot Management

Time is a first-class entity.

Do not hard-code times into the algorithm.

Allow configurable time slots.

Example:

1.  08:00--09:00
2.  09:00--10:00
3.  10:00--11:00
4.  11:00--12:00
5.  12:00--13:00
6.  13:00--14:00
7.  14:00--15:00
8.  15:00--16:00
9.  16:00--17:00

Each time slot contains:

-   Slot ID
-   Start time
-   End time
-   Duration
-   Slot type
-   Day applicability
-   Break flag
-   Lunch flag
-   Active/inactive

Support custom durations.

Example:

Lab: 09:00--11:00

Theory: 11:00--12:00

The scheduler must support multi-slot sessions.

------------------------------------------------------------------------

# 13. Date and Day Handling

The system must distinguish between:

-   Day of week
-   Calendar date
-   Academic schedule

Support:

-   Monday--Saturday recurring timetable
-   Specific dates
-   Holidays
-   Examination dates
-   Institutional events
-   Special working days
-   Non-working days

Allow calendar exceptions.

Example:

15 August → Holiday

20 August → Special working Saturday

The generator must respect configured exceptions when date-level
scheduling is enabled.

------------------------------------------------------------------------

# 14. Break Management

Support:

-   Short break
-   Lunch break
-   Custom break
-   Department-specific break

Example:

12:30--13:30 Lunch

Break slots must never receive academic classes.

------------------------------------------------------------------------

# 15. Scheduling Rules

## 15.1 Hard Constraints

These must never be violated.

Examples:

1.  Teacher cannot teach two classes simultaneously.
2.  Room cannot host two classes simultaneously.
3.  Section cannot attend two classes simultaneously.
4.  Room capacity must be sufficient.
5.  Lab subject requires lab room.
6.  Teacher unavailable time cannot be used.
7.  Room unavailable time cannot be used.
8.  Section unavailable time cannot be used.
9.  Required subject hours must be satisfied.
10. Required working days must be respected.
11. Break periods cannot contain classes.
12. Holiday periods cannot contain classes.
13. A class cannot be assigned to a non-existent room.
14. A class cannot be assigned to an unavailable teacher.
15. A class cannot be assigned to an unavailable timeslot.

## 15.2 Soft Constraints

These should be optimized.

Examples:

1.  Avoid teacher gaps.
2.  Avoid excessive consecutive classes.
3.  Spread subjects across days.
4.  Balance daily student workload.
5.  Balance teacher workload.
6.  Prefer teacher preferred times.
7.  Prefer teacher preferred days.
8.  Prefer suitable rooms.
9.  Reduce unnecessary room changes.
10. Avoid placing difficult subjects consecutively.
11. Avoid too many classes in one day.
12. Maximize room utilization without creating conflicts.

Soft constraints must be configurable and weighted.

------------------------------------------------------------------------

# 16. Constraint Priority System

Provide configurable weights.

Example:

Teacher preference: Weight = 5

Balanced workload: Weight = 8

Avoid consecutive classes: Weight = 7

Room preference: Weight = 4

The optimization engine should use these weights.

------------------------------------------------------------------------

# 17. Graph Representation

Core mapping:

-   Vertex = class/session
-   Edge = conflict
-   Color = timeslot

Two vertices receive an edge if they cannot occur simultaneously.

Possible conflict reasons:

-   Same teacher
-   Same section
-   Same student group
-   Same required room
-   Shared resource
-   Special constraint

The graph should preserve conflict metadata.

Example:

``` text
Vertex: DBMS Section A
Vertex: OS Section A

Edge reason:
Same section
```

------------------------------------------------------------------------

# 18. Graph Coloring Engine

Required functionality:

1.  Create graph.
2.  Add vertices.
3.  Add conflict edges.
4.  Calculate graph degree.
5.  Select coloring order.
6.  Assign colors.
7.  Detect uncolorable situations under current constraints.
8.  Map colors to timeslots.
9.  Continue to room assignment.
10. Validate final schedule.

Possible strategy:

-   Greedy coloring
-   Degree-based ordering
-   DSATUR-style ordering if appropriate

The algorithm implementation must be clearly documented.

------------------------------------------------------------------------

# 19. Room Assignment Engine

After or during coloring, assign rooms.

Room selection must consider:

-   Capacity
-   Room type
-   Lab requirement
-   Availability
-   Department preference
-   Existing room occupancy
-   Time slot

Example:

40 students + Computer Lab requirement

Valid: Lab 1 capacity 50

Invalid: Room 101 capacity 30

------------------------------------------------------------------------

# 20. Teacher Assignment

If teachers are assigned before scheduling, use those assignments as
constraints.

If multiple eligible teachers exist, the scheduler may choose based on:

-   Availability
-   Workload
-   Preference
-   Qualification
-   Subject compatibility

Teacher conflict validation is mandatory.

------------------------------------------------------------------------

# 21. Optimization Engine

After generating a valid schedule, calculate a quality score.

Example conceptual model:

Quality Score = 100 - hard constraint violations × very large penalty -
teacher gap penalty - consecutive class penalty - workload imbalance
penalty - room inefficiency penalty - preference violation penalty

A valid timetable should have:

Hard conflicts = 0

Soft violations may remain depending on feasibility.

The exact scoring model must be documented and configurable.

------------------------------------------------------------------------

# 22. Timetable Validation Engine

The validator must independently verify the generated result.

Do not rely on the generator's internal assumptions.

Validation categories:

-   Teacher conflicts
-   Room conflicts
-   Section conflicts
-   Capacity violations
-   Lab-room violations
-   Availability violations
-   Break violations
-   Holiday violations
-   Missing required sessions
-   Duplicate sessions
-   Invalid times
-   Invalid dates
-   Invalid assignments

Output:

-   Valid / Invalid
-   Total hard conflicts
-   Total soft violations
-   Detailed conflict list
-   Conflict severity
-   Recommended resolution

------------------------------------------------------------------------

# 23. Impossible Schedule Handling

The system must gracefully handle impossible inputs.

Example:

There are:

-   10 lab classes
-   1 lab room
-   5 available periods

The system must not simply fail with a server error.

Display:

"Unable to create a completely valid timetable."

Then explain:

-   Which constraint caused failure
-   Which classes could not be scheduled
-   What resource is insufficient
-   Suggested actions

Example suggestions:

-   Add another room
-   Add more timeslots
-   Increase working days
-   Relax a soft constraint
-   Change teacher availability

------------------------------------------------------------------------

# 24. Timetable Result View

The timetable must support multiple viewing dimensions inside the same
interface.

## By Section

Monday--Saturday × time slots.

## By Teacher

Teacher schedule.

## By Room

Room occupancy.

## By Subject

Subject sessions.

## By Day

Daily timetable.

## By Date

Specific calendar date.

These are views of the same generated dataset, not separate
applications/interfaces.

------------------------------------------------------------------------

# 25. Timetable Cell Details

Every timetable cell should be clickable.

Show:

-   Subject name
-   Subject code
-   Teacher
-   Room
-   Section
-   Department
-   Semester
-   Date
-   Day
-   Start time
-   End time
-   Session type
-   Duration
-   Student count
-   Room capacity
-   Scheduling score
-   Constraint status

Also show:

"Why was this slot selected?"

Possible reasons:

-   Teacher available
-   Room available
-   Section available
-   No graph conflict
-   Preferred time
-   Balanced workload
-   Suitable room capacity

------------------------------------------------------------------------

# 26. Timetable Editing

Allow controlled manual editing after generation.

User can:

-   Move class
-   Change room
-   Change teacher if allowed
-   Change timeslot
-   Change section
-   Swap classes

After every manual edit:

1.  Validate.
2.  Detect conflicts.
3.  Show warnings.
4.  Prevent hard-invalid save unless explicitly overridden by a
    controlled mechanism.

------------------------------------------------------------------------

# 27. Auto Resolve

If a conflict is detected:

Provide:

"Auto Resolve"

The engine should:

1.  Identify affected session.
2.  Find alternative timeslots.
3.  Find compatible rooms.
4.  Check teacher availability.
5.  Check section conflicts.
6.  Score candidate solutions.
7.  Select the best valid alternative.
8.  Update timetable.
9.  Revalidate.

------------------------------------------------------------------------

# 28. Algorithm Visualization

Create a dedicated Algorithm page.

Show:

-   Input
-   Generated vertices
-   Conflict edges
-   Coloring order
-   Assigned colors
-   Timeslot mapping
-   Constraint checks
-   Final timetable

Animation:

Step 1: Creating vertices

Step 2: Creating edges

Step 3: Calculating degree

Step 4: Assigning colors

Step 5: Mapping colors to times

Step 6: Assigning rooms

Step 7: Validating

Step 8: Optimizing

Step 9: Final result

------------------------------------------------------------------------

# 29. Algorithm Metrics

Display:

-   Number of vertices
-   Number of edges
-   Number of colors
-   Number of timeslots
-   Graph density
-   Generation time
-   Validation time
-   Optimization time
-   Total execution time
-   Number of conflicts before optimization
-   Number of conflicts after optimization
-   Quality score

------------------------------------------------------------------------

# 30. Analytics

Analytics should include:

-   Total classes
-   Scheduled classes
-   Unscheduled classes
-   Hard conflicts
-   Soft violations
-   Quality score
-   Room utilization
-   Teacher utilization
-   Daily workload
-   Section workload
-   Subject distribution
-   Free slots
-   Most used room
-   Most loaded teacher
-   Least utilized room

Analytics must be calculated from real project data.

Do not use fake values.

------------------------------------------------------------------------

# 31. Conflict Center

Show all detected conflicts.

Categories:

-   Critical
-   High
-   Medium
-   Low
-   Informational

Examples:

Teacher conflict Room conflict Section conflict Capacity conflict
Availability conflict Lab conflict

Actions:

-   View
-   Resolve
-   Auto Resolve
-   Ignore only where allowed
-   Revalidate

------------------------------------------------------------------------

# 32. Import System

Support importing data where practical.

Possible formats:

-   CSV
-   Excel

Import:

-   Subjects
-   Teachers
-   Rooms
-   Sections
-   Time slots

Validate imported data before inserting it.

Show row-level errors.

Example:

"Row 12: Room capacity must be a positive number."

------------------------------------------------------------------------

# 33. Export System

Support:

-   PDF
-   Excel
-   CSV
-   Print-friendly view

Export views:

-   Complete timetable
-   Section timetable
-   Teacher timetable
-   Room timetable
-   Daily timetable
-   Weekly timetable
-   Conflict report
-   Analytics report

Exports must use actual generated data.

------------------------------------------------------------------------

# 34. Search and Filtering

Global and page-level filtering.

Search:

-   Subject name
-   Subject code
-   Teacher
-   Room
-   Section
-   Department

Filters:

-   Department
-   Semester
-   Section
-   Day
-   Date
-   Teacher
-   Room
-   Subject type
-   Conflict status

------------------------------------------------------------------------

# 35. Data Validation

Validate at both frontend and backend.

Examples:

-   Required fields
-   Time format
-   Date format
-   Capacity
-   Duplicate codes
-   Duplicate room numbers
-   Invalid durations
-   Invalid ranges
-   Missing teacher
-   Missing room type
-   Missing section

Backend validation is mandatory even if frontend validation exists.

------------------------------------------------------------------------

# 36. Error Handling

Never expose raw stack traces to users.

Provide meaningful errors.

Examples:

"Unable to generate timetable because no compatible laboratory is
available."

"Teacher availability leaves insufficient timeslots for this subject."

"Section A has more required sessions than available weekly periods."

Technical errors must be logged internally.

------------------------------------------------------------------------

# 37. Database Design

Recommended relational database:

PostgreSQL.

Core tables:

-   users if authentication is implemented
-   academic_years
-   departments
-   semesters
-   sections
-   subjects
-   teachers
-   teacher_availability
-   rooms
-   room_availability
-   time_slots
-   holidays
-   breaks
-   constraints
-   timetable_runs
-   timetable_entries
-   conflict_records
-   optimization_scores
-   exports

Use proper relationships and foreign keys.

Do not duplicate data unnecessarily.

------------------------------------------------------------------------

# 38. Backend Architecture

Recommended:

Python + FastAPI.

Structure:

``` text
backend/
  app/
    api/
    models/
    schemas/
    services/
    algorithm/
    validators/
    database/
    utils/
    config/
    main.py
  tests/
```

Algorithm modules:

``` text
algorithm/
  graph_builder.py
  graph_coloring.py
  room_assignment.py
  teacher_assignment.py
  constraints.py
  optimizer.py
  scheduler.py
  validator.py
  scorer.py
```

Keep algorithm logic independent from HTTP routes.

------------------------------------------------------------------------

# 39. API Design

Example endpoints:

## Academic

GET /api/academic-years POST /api/academic-years

## Departments

GET /api/departments POST /api/departments

## Sections

GET /api/sections POST /api/sections PUT /api/sections/{id} DELETE
/api/sections/{id}

## Subjects

GET /api/subjects POST /api/subjects PUT /api/subjects/{id} DELETE
/api/subjects/{id}

## Teachers

GET /api/teachers POST /api/teachers PUT /api/teachers/{id} DELETE
/api/teachers/{id}

## Rooms

GET /api/rooms POST /api/rooms PUT /api/rooms/{id} DELETE
/api/rooms/{id}

## Time slots

GET /api/time-slots POST /api/time-slots

## Generation

POST /api/timetable/generate GET /api/timetable/{id} POST
/api/timetable/{id}/validate POST /api/timetable/{id}/regenerate POST
/api/timetable/{id}/optimize

## Conflicts

GET /api/conflicts POST /api/conflicts/{id}/resolve

## Analytics

GET /api/analytics/{timetable_id}

## Export

GET /api/export/{timetable_id}/pdf GET /api/export/{timetable_id}/excel
GET /api/export/{timetable_id}/csv

------------------------------------------------------------------------

# 40. Frontend Architecture

Recommended modern stack:

-   Next.js
-   TypeScript
-   Tailwind CSS
-   Component library as appropriate
-   Animation library as appropriate
-   Chart library as appropriate

Suggested structure:

``` text
frontend/
  app/
  components/
    dashboard/
    timetable/
    generator/
    subjects/
    teachers/
    sections/
    rooms/
    constraints/
    algorithm/
    analytics/
    conflicts/
  hooks/
  lib/
  services/
  types/
  utils/
```

------------------------------------------------------------------------

# 41. UI/UX Rule

The project owner will provide the UI/UX design.

The implementation agent must:

1.  Read the design requirements.
2.  Preserve layout.
3.  Preserve visual hierarchy.
4.  Preserve navigation.
5.  Preserve interaction behavior.
6.  Preserve responsive behavior.
7.  Implement animations where specified.
8.  Avoid replacing the design with a generic dashboard.

If no exact visual specification is available for a particular screen,
use the existing project design language and maintain consistency.

------------------------------------------------------------------------

# 42. Responsive Design

The application must work on:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Timetable grids must remain usable on small screens.

Use:

-   Horizontal scrolling where appropriate
-   Sticky headers
-   Responsive cards
-   Collapsible filters
-   Mobile navigation
-   Touch-friendly controls

Do not simply shrink the desktop UI.

------------------------------------------------------------------------

# 43. Accessibility

Include:

-   Keyboard navigation
-   Visible focus states
-   Semantic HTML
-   Accessible labels
-   Sufficient contrast
-   Clear error messages
-   Non-color-only conflict indicators
-   Screen-reader-friendly controls where practical

------------------------------------------------------------------------

# 44. Loading States

Every expensive operation needs a loading state.

Especially:

-   Timetable generation
-   Optimization
-   Validation
-   Import
-   Export
-   Auto resolve

Generation should display meaningful progress stages.

------------------------------------------------------------------------

# 45. Empty States

Examples:

No subjects:

"No subjects added yet."

\[Add Subject\]

No timetable:

"No timetable has been generated."

\[Generate Timetable\]

No conflicts:

"Everything looks good. No conflicts detected."

------------------------------------------------------------------------

# 46. Demo Mode

Provide sample data loading.

Button:

"Load Demo Data"

Populate:

-   Academic year
-   Department
-   Sections
-   Subjects
-   Teachers
-   Rooms
-   Time slots
-   Constraints

The demo must allow a complete generation flow without manual setup.

This is critical for presentations.

------------------------------------------------------------------------

# 47. Seed Data

Create deterministic seed data for testing.

Do not depend on random data for automated tests.

------------------------------------------------------------------------

# 48. Testing Strategy

## Unit Tests

Test:

-   Graph creation
-   Edge generation
-   Coloring
-   Constraint checking
-   Room assignment
-   Teacher assignment
-   Scoring
-   Validation

## Integration Tests

Test:

Frontend → API → Scheduler → Database.

## API Tests

Test:

-   Valid requests
-   Invalid requests
-   Missing fields
-   Duplicate records
-   Conflict cases

## End-to-End Tests

Test:

1.  Load application.
2.  Load demo data.
3.  Generate timetable.
4.  Validate.
5.  View timetable.
6.  Create conflict.
7.  Auto resolve.
8.  Export.

------------------------------------------------------------------------

# 49. Algorithm Test Cases

Minimum cases:

### Case 1

Simple timetable with no conflicts.

### Case 2

Two subjects with same teacher.

### Case 3

Two subjects with same section.

### Case 4

Two subjects requiring same room.

### Case 5

Lab requirement.

### Case 6

Insufficient room capacity.

### Case 7

Teacher unavailable.

### Case 8

Room unavailable.

### Case 9

Insufficient timeslots.

### Case 10

Multiple sections.

### Case 11

Multi-slot lab.

### Case 12

Holiday.

### Case 13

Break period.

### Case 14

Impossible schedule.

### Case 15

Large dataset/performance test.

------------------------------------------------------------------------

# 50. Performance Requirements

Measure:

-   Graph creation time
-   Coloring time
-   Room assignment time
-   Validation time
-   Optimization time
-   Total generation time

The UI must not freeze during generation.

For large workloads, consider background processing.

------------------------------------------------------------------------

# 51. Logging

Backend logs should include:

-   Generation start
-   Generation end
-   Input summary
-   Algorithm stages
-   Errors
-   Validation results
-   Optimization results

Do not log passwords or secrets.

------------------------------------------------------------------------

# 52. Security

If authentication is included:

-   Password hashing
-   Secure sessions/JWT
-   Authorization
-   Input validation
-   CORS
-   Environment variables
-   Secure secrets
-   SQL injection protection
-   Rate limiting where appropriate

Never hard-code secrets.

------------------------------------------------------------------------

# 53. Environment Configuration

Use:

``` text
.env
```

Examples:

DATABASE_URL SECRET_KEY API_BASE_URL

Provide:

``` text
.env.example
```

Do not commit real secrets.

------------------------------------------------------------------------

# 54. Documentation

Create:

-   README.md
-   Architecture documentation
-   Algorithm documentation
-   API documentation
-   Database documentation
-   Setup guide
-   Testing guide
-   Deployment guide
-   User guide

Explain Graph Coloring clearly.

------------------------------------------------------------------------

# 55. Viva / Academic Explanation

The project documentation must explain:

## Why graph coloring?

Because conflicting classes cannot share the same timeslot.

## What is a vertex?

A scheduled class/session.

## What is an edge?

A conflict relationship.

## What is a color?

A timeslot.

## What happens after coloring?

Room assignment and constraint validation.

## What if a valid coloring is not enough?

Additional constraints and optimization are applied.

------------------------------------------------------------------------

# 56. Complexity Documentation

Document the actual implemented algorithm.

For example, if a greedy coloring implementation is used, document its
complexity according to the actual implementation.

Do not claim a complexity that the implementation does not have.

If multiple algorithms are implemented, compare them.

Possible comparison:

-   Greedy
-   Largest-degree-first
-   DSATUR

Measure:

-   Colors used
-   Execution time
-   Conflicts
-   Quality

------------------------------------------------------------------------

# 57. Algorithm Comparison Feature

If time permits, add:

"Compare Algorithms"

Example:

  Algorithm        Colors   Time   Conflicts   Score
  -------------- -------- ------ ----------- -------
  Greedy                9   12ms           0      88
  Degree First          8   16ms           0      91
  DSATUR                7   23ms           0      95

Only show measured values.

This would be an excellent academic feature.

------------------------------------------------------------------------

# 58. Timetable Versioning

Every generation should create a version.

Example:

Timetable v1 Timetable v2 Timetable v3

Store:

-   Generation timestamp
-   Input configuration
-   Algorithm used
-   Quality score
-   Constraint configuration
-   Result

Allow:

-   View previous version
-   Compare versions
-   Restore version

------------------------------------------------------------------------

# 59. Undo / Redo

For manual timetable edits, consider:

-   Undo
-   Redo

This prevents accidental changes.

------------------------------------------------------------------------

# 60. Autosave

Where appropriate:

-   Save configuration changes
-   Save timetable edits
-   Preserve draft state

Do not lose user work because of a page refresh.

------------------------------------------------------------------------

# 61. Generation Workflow

The complete workflow must be:

``` text
Landing Page
      ↓
Open Application
      ↓
Academic Setup
      ↓
Add Sections
      ↓
Add Subjects
      ↓
Add Teachers
      ↓
Add Rooms
      ↓
Configure Time Slots
      ↓
Configure Dates / Working Days
      ↓
Configure Breaks
      ↓
Configure Constraints
      ↓
Validate Input
      ↓
Build Conflict Graph
      ↓
Graph Coloring
      ↓
Assign Times
      ↓
Assign Teachers
      ↓
Assign Rooms
      ↓
Apply Hard Constraints
      ↓
Optimize Soft Constraints
      ↓
Validate Final Timetable
      ↓
Calculate Quality Score
      ↓
Display Timetable
      ↓
Allow Manual Editing
      ↓
Revalidate
      ↓
Export
```

------------------------------------------------------------------------

# 62. Project Development Roadmap

## Phase 0 --- Requirements

Deliverables:

-   Final requirements
-   Project scope
-   Feature list
-   Constraints
-   UI/UX specification

## Phase 1 --- Protocol

Create:

PROJECT_PROTOCOL.md

It becomes the source of truth.

## Phase 2 --- Architecture

Finalize:

-   Frontend
-   Backend
-   Database
-   Algorithm engine
-   API structure

## Phase 3 --- Database

Implement:

-   Tables
-   Relationships
-   Migrations
-   Seed data

## Phase 4 --- Algorithm Prototype

Build independently of UI:

-   Graph builder
-   Coloring
-   Constraints
-   Room assignment
-   Validation
-   Optimization

## Phase 5 --- Backend

Expose the algorithm through APIs.

## Phase 6 --- Frontend Foundation

Implement:

-   Routing
-   Layout
-   Navigation
-   Design system
-   Reusable components

## Phase 7 --- Data Management

Implement:

-   Subjects
-   Teachers
-   Sections
-   Rooms
-   Time slots
-   Dates
-   Constraints

## Phase 8 --- Generator

Implement:

-   Configuration
-   Generation
-   Progress
-   Results

## Phase 9 --- Validation / Conflicts

Implement:

-   Conflict center
-   Validator
-   Auto resolve

## Phase 10 --- Algorithm Visualization

Implement:

-   Graph
-   Coloring
-   Step visualization
-   Metrics

## Phase 11 --- Analytics

Implement:

-   Quality
-   Workload
-   Room usage
-   Conflicts

## Phase 12 --- Export

Implement:

-   PDF
-   Excel
-   CSV
-   Print

## Phase 13 --- Polish

Implement:

-   Loading states
-   Empty states
-   Error states
-   Animations
-   Responsive behavior
-   Accessibility

## Phase 14 --- Testing

Run all test categories.

## Phase 15 --- Deployment

Deploy:

-   Frontend
-   Backend
-   Database

## Phase 16 --- Final Audit

Compare every requirement against the Protocol.

------------------------------------------------------------------------

# 63. Git / Version Control Strategy

Use meaningful commits.

Examples:

feat: add subject management

feat: implement graph builder

feat: implement timetable coloring

feat: add room assignment

feat: add timetable validation

feat: add conflict center

feat: add algorithm visualization

fix: prevent room double booking

fix: handle unavailable teacher

refactor: separate scheduler service

docs: add algorithm documentation

Do not make one enormous final commit.

------------------------------------------------------------------------

# 64. Definition of Done

A feature is NOT complete merely because its UI exists.

A feature is complete only when:

-   UI exists
-   API exists where needed
-   Database exists where needed
-   Validation exists
-   Error handling exists
-   Tests exist
-   Integration works
-   Real data works
-   Edge cases are handled
-   UI states are handled
-   Documentation is updated

------------------------------------------------------------------------

# 65. Final Acceptance Checklist

Before final delivery verify:

## Product

-   Landing page exists.
-   Unified interface exists.
-   Navigation works.
-   Dashboard works.

## Academic data

-   Academic year works.
-   Department works.
-   Semester works.
-   Sections work.
-   Subjects work.
-   Teachers work.
-   Rooms work.
-   Time slots work.
-   Dates work.
-   Working days work.
-   Holidays work.
-   Breaks work.

## Algorithm

-   Graph created correctly.
-   Conflicts represented correctly.
-   Coloring works.
-   Timeslots mapped correctly.
-   Constraints applied.
-   Rooms assigned.
-   Teachers respected.
-   Sections respected.
-   Final schedule validated.
-   Optimization works.

## Timetable

-   Timetable displays correctly.
-   Cells show complete information.
-   Filtering works.
-   Search works.
-   Different timetable views work.
-   Manual edits work.
-   Validation after edits works.

## Conflicts

-   Conflicts detected.
-   Conflict details shown.
-   Auto resolve works where feasible.
-   Impossible cases explained.

## Analytics

-   Quality score is real.
-   Room utilization is real.
-   Faculty workload is real.
-   Conflict metrics are real.
-   Generation metrics are real.

## Export

-   PDF works.
-   Excel works.
-   CSV works.
-   Print view works.

## Quality

-   Responsive.
-   Accessible.
-   Error handling.
-   Loading states.
-   Empty states.
-   No fake metrics.
-   No fake algorithm behavior.

------------------------------------------------------------------------

# 66. Final Project Presentation Story

The presentation should follow:

1.  Problem
2.  Existing manual difficulty
3.  Proposed system
4.  Graph Coloring concept
5.  Constraint handling
6.  System architecture
7.  Live input
8.  Generate
9.  Algorithm visualization
10. Generated timetable
11. Conflict detection
12. Auto resolve
13. Analytics
14. Export
15. Performance
16. Future scope

------------------------------------------------------------------------

# 67. Future Scope

Possible future improvements:

-   Genetic Algorithm comparison
-   Ant Colony Optimization
-   Simulated Annealing
-   AI-assisted constraint suggestions
-   Natural language timetable configuration
-   Historical timetable analysis
-   Automatic workload balancing
-   Multi-campus scheduling
-   Examination timetable generation
-   Transport/resource scheduling
-   Cloud collaboration
-   Advanced optimization

These are future scope items unless explicitly included in the current
implementation.

------------------------------------------------------------------------

# 68. Critical Agent Instructions

When this plan is given to an AI coding agent:

1.  Read the entire plan before coding.
2.  Inspect the existing repository.
3.  Never assume a feature is implemented.
4.  Never fake algorithm output.
5.  Never hard-code timetable results.
6.  Never use fake analytics.
7.  Never claim zero conflicts without validation.
8.  Keep algorithm logic separate from UI.
9.  Follow the supplied UI/UX design.
10. Do not create separate student/faculty/admin interfaces.
11. Keep one unified application interface.
12. Do not skip edge cases.
13. Do not silently remove requirements.
14. Do not introduce unnecessary technologies.
15. Test each major module.
16. Verify frontend/backend integration.
17. Verify database relationships.
18. Verify algorithm correctness.
19. Verify export output.
20. Perform a final requirement-by-requirement audit.

If a requirement is ambiguous, use the most conservative interpretation
that preserves the project's stated goals. If the ambiguity can cause
architectural or data correctness problems, document the issue before
making a major decision.

------------------------------------------------------------------------

# 69. Final Deliverable

The finished repository should contain, at minimum:

``` text
project/
│
├── frontend/
├── backend/
├── database/
├── tests/
├── docs/
├── exports/
├── PROJECT_PROTOCOL.md
├── README.md
├── .env.example
└── deployment configuration
```

The final product must be a complete working application rather than a
collection of screens.

The core principle is:

INPUT DATA → BUILD CONFLICT GRAPH → GRAPH COLORING → TIME ASSIGNMENT →
TEACHER VALIDATION → ROOM ASSIGNMENT → HARD CONSTRAINT VALIDATION → SOFT
CONSTRAINT OPTIMIZATION → QUALITY SCORING → FINAL VALIDATION → TIMETABLE
→ EDIT / RESOLVE → EXPORT

------------------------------------------------------------------------

# 70. Ultimate Project Goal

The final system should make a judge/user feel:

"I can provide my college's subjects, teachers, rooms, sections, dates,
times, availability and constraints, click Generate, and receive a
validated, optimized, explainable timetable."

That is the definition of a successful project.

The UI/UX is intentionally left for the project owner to design. The
engineering implementation must adapt to and faithfully implement the
supplied design while preserving all functional requirements in this
roadmap.
