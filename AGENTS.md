# RESILIENCE AUTOPILOT

## Master Agent Instructions

---

# 1. PROJECT

Build **Resilience Autopilot**, an agentic AI platform for supply-chain resilience.

The product continuously monitors external-world signals, validates them, rehearses increasingly severe scenarios, evaluates recovery strategies through specialized decision agents, and prepares actions before disruption becomes damage.

When disruption becomes real, the system re-evaluates the current situation, automatically executes low-risk actions, routes high-impact decisions to humans, verifies the result, and re-optimizes when necessary.

### Core philosophy

> **We don't wait for disruption to plan. We continuously rehearse it.**

The deeper principle is:

> **Prediction is not the outcome. Preparedness is.**

The product is NOT a chatbot.

It is NOT a generic AI assistant.

It is a **decision and resilience control system**.

---

# 2. CORE SYSTEM LOOP

The complete system follows:

```text
SENSE
  ↓
VALIDATE
  ↓
REHEARSE
  ↓
SIMULATE
  ↓
OPTIMIZE
  ↓
GOVERN
  ↓
ACT
  ↓
VERIFY
  ↓
HEAL
```

The system operates in two major modes.

---

# 3. MODE A — CONTINUOUS REHEARSAL

A signal does not necessarily mean that the business should immediately intervene.

Example:

```text
Shanghai Port
Possible closure: 2 hours
```

This is a moderate disruption.

The system should recognize:

> "This is manageable now, but it could become significantly worse."

The Scenario Agent therefore rehearses increasingly severe futures.

```text
PORT DISRUPTION

├── 2 HOURS
├── 24 HOURS
├── 7 DAYS
├── PERMANENT
│
└── COMPOUND CONDITIONS
    ├── alternate port congestion
    ├── supplier capacity shortage
    └── demand spike
```

The purpose is not to predict exactly what will happen.

The purpose is to answer:

> **"If this gets worse, what should the business do?"**

The resulting strategies become prepared recovery playbooks.

---

# 4. MODE B — LIVE DISRUPTION

When a disruption actually occurs:

```text
External signal
      ↓
Sensing Agent
      ↓
Signal Validation Agent
      ↓
Confirmed event
      ↓
Find rehearsed scenario
      ↓
Re-evaluate against CURRENT state
      ↓
Domain agents
      ↓
Orchestrator
      ↓
Risk / governance
      ↓
Automatic action OR human approval
      ↓
Execute
      ↓
Verify
      ↓
Re-optimize
```

A previously rehearsed plan must NEVER be blindly executed.

The real-world state may have changed since the rehearsal.

---

# 5. AGENTS

The prototype uses nine agents.

---

## 5.1 SENSING AGENT

Purpose:

Convert external-world information into structured disruption events.

Potential inputs:

* RSS
* news
* weather
* port information
* geopolitical signals
* supplier alerts
* public intelligence
* synthetic/mock events

Example:

```json
{
  "eventType": "PORT_DISRUPTION",
  "location": "Shanghai",
  "expectedDuration": 2,
  "durationUnit": "hours",
  "severity": "MODERATE",
  "confidence": 0.84
}
```

The Sensing Agent should handle both live and mock data.

---

## 5.2 SIGNAL VALIDATION AGENT

Purpose:

Determine whether a signal is credible enough to enter the decision system.

Responsibilities:

* correlate multiple sources
* detect duplicate information
* assess confidence
* classify severity
* compare against enterprise context

Critical rule:

> **One article must never trigger a high-impact enterprise decision.**

High-impact actions require stronger validation.

---

## 5.3 SCENARIO AGENT

Purpose:

Turn disruption signals into possible future conditions.

For example:

```text
2-hour closure
      ↓
24-hour closure
      ↓
7-day closure
      ↓
Permanent closure
```

It should also create compound scenarios where appropriate.

The Scenario Agent is the primary **"what if?"** engine.

It should also be able to identify previously rehearsed scenarios when a real disruption occurs.

---

## 5.4 LOGISTICS AGENT

Evaluate:

* alternate routes
* alternate ports
* transportation modes
* shipment prioritization
* transit time
* logistics cost
* capacity

---

## 5.5 INVENTORY AGENT

Evaluate:

* inventory redistribution
* safety stock
* warehouse allocation
* stockout risk
* inventory positioning

Inventory redistribution is generally a lower-risk action and may be automatically executed if policy permits.

---

## 5.6 PROCUREMENT AGENT

Evaluate:

* alternate suppliers
* supplier capacity
* sourcing shifts
* supplier reliability
* procurement cost
* supplier lead time

Changing major suppliers is normally considered a higher-risk action.

---

## 5.7 FINANCE AGENT

Evaluate:

* incremental cost
* revenue exposure
* margin impact
* working capital
* financial risk

Finance provides quantitative inputs to strategy evaluation.

---

## 5.8 SUSTAINABILITY AGENT

Evaluate:

* transportation emissions
* carbon impact
* environmental tradeoffs

Example:

Air freight may dramatically reduce recovery time while significantly increasing emissions.

The Sustainability Agent should expose this tradeoff rather than simply rejecting the option.

---

## 5.9 COMPLIANCE AGENT

Evaluate:

* tariff implications
* trade restrictions
* regulatory requirements
* route restrictions
* supplier restrictions
* policy constraints

Hard compliance violations must eliminate a strategy.

---

# 6. ORCHESTRATOR

The Orchestrator coordinates the agents and produces the final recommendation.

It should NOT simply ask an LLM:

> "Which option is best?"

Instead:

```text
Collect strategies
      ↓
Apply hard constraints
      ↓
Remove infeasible strategies
      ↓
Calculate quantitative metrics
      ↓
Score remaining strategies
      ↓
Rank strategies
      ↓
Select next-best action
      ↓
Explain decision
      ↓
Determine autonomy level
```

Example:

```text
43 scenarios generated
        ↓
18 feasible
        ↓
11 compliant
        ↓
6 financially viable
        ↓
3 resilient strategies
        ↓
1 next-best action
```

These numbers are illustrative demo values.

---

# 7. STRATEGY OPTIMIZATION

The system evaluates strategies across:

* Cost
* Recovery time
* Service level
* Inventory impact
* Revenue exposure
* Risk
* Capacity
* Compliance
* Sustainability
* Supplier reliability

Example configurable weighting:

```text
Cost            25%
Service Level   30%
Recovery Time   20%
Risk            15%
Compliance      10%
```

These weights must be configurable.

They are not universal business truths.

---

## HARD CONSTRAINTS

Examples:

* compliance violation
* unavailable supplier
* impossible capacity
* impossible route
* insufficient inventory

A strategy violating a hard constraint is eliminated.

---

## OPTIMIZATION OBJECTIVES

Examples:

* lower cost
* faster recovery
* higher service level
* lower emissions
* lower risk

These influence ranking after hard constraints are satisfied.

---

# 8. DIGITAL TWIN

Create a simplified computational representation of the supply chain.

Entities:

```text
Supplier
   ↓
Port
   ↓
Shipment
   ↓
Plant
   ↓
Inventory
   ↓
Customer
```

The Digital Twin should contain:

* suppliers
* plants
* products
* inventory
* shipments
* routes
* customers
* capacities
* dependencies

The prototype uses synthetic/demo data.

Never claim synthetic values are real enterprise data.

---

# 9. PRIMARY DEMO

The hero scenario is:

> **A port reports a possible 2-hour disruption.**

The system does NOT immediately panic.

It starts resilience rehearsal.

```text
2 hours
24 hours
7 days
Permanent
```

It evaluates increasingly severe conditions.

The system produces a recovery strategy and stores it as a rehearsed playbook.

Later:

> **The port closure becomes real.**

The system:

```text
Detects
   ↓
Validates
   ↓
Matches rehearsal
   ↓
Re-evaluates current state
   ↓
Chooses recovery strategy
   ↓
Executes low-risk actions
   ↓
Requests human approval for high-risk actions
   ↓
Executes approved actions
   ↓
Verifies
   ↓
Re-optimizes
```

---

# 10. HUMAN-IN-THE-LOOP

Autonomy must be proportional to risk.

### LOW RISK

Examples:

* inventory redistribution
* shipment reprioritization
* minor route modification

Potentially:

```text
AUTO EXECUTE
```

### HIGH RISK

Examples:

* changing primary supplier
* changing primary port
* major procurement commitment
* major financial exposure

Require:

```text
HUMAN APPROVAL REQUIRED
```

The UI must make this distinction extremely obvious.

---

# 11. TECHNOLOGY

Use:

* Next.js
* TypeScript
* App Router
* Tailwind CSS
* shadcn/ui where useful
* Recharts
* React Flow or equivalent network visualization
* Motion for meaningful React-level animations when useful

Use Next.js API routes for backend functionality.

Do NOT create a separate Express server unless genuinely required.

Prefer a single Next.js repository.

---

# 12. DATA STRATEGY

Start with local synthetic JSON.

```text
/data
  network.json
  suppliers.json
  plants.json
  inventory.json
  shipments.json
  customers.json
  events.json
  scenarios.json
  strategies.json
```

The prototype MUST have a reliable demo mode.

External APIs may fail during a hackathon.

Therefore:

> **Real signal + deterministic mock fallback**

is preferred over relying entirely on live APIs.

For trade-policy sensing, USTR RSS may be used as a real external signal.

---

# 13. AI USAGE

AI should provide value in:

* interpreting unstructured signals
* extracting structured events
* generating scenario descriptions
* qualitative reasoning
* explaining strategy tradeoffs
* summarizing agent reasoning

AI should NOT control:

* arithmetic
* hard constraints
* compliance enforcement
* deterministic scoring
* financial calculations
* final authorization

The LLM is not the system of record.

Critical decisions must be traceable to structured data and deterministic calculations.

---

# 14. APPLICATION ROUTES

Create these primary pages.

```text
/
```

Control Tower.

```text
/network
```

Digital Twin / network graph.

```text
/signals
```

External intelligence and detected events.

```text
/scenarios
```

Scenario rehearsal and stress testing.

```text
/agents
```

Agent control and activity.

```text
/decisions
```

Next-best action and human approval.

---

# 15. CONTROL TOWER

The Control Tower is the primary screen.

It should communicate:

1. What is happening?
2. Where is it happening?
3. What is affected?
4. What could happen?
5. What are the agents doing?
6. What should we do?
7. What can happen automatically?

The network graph should be a major visual element.

Do not make KPI cards the primary experience.

Potential information:

```text
NETWORK HEALTH
97%

ACTIVE RISKS
1

REVENUE EXPOSURE
₹18.7 Cr

INVENTORY AT RISK
4 locations

RECOVERY READINESS
91%
```

Values are illustrative demo data.

---

# 16. DIGITAL TWIN / NETWORK GRAPH

The network graph is a signature visual component.

Example:

```text
Supplier
   │
   ↓
Port
   │
   ↓
Shipment
   │
   ↓
Plant
   │
   ↓
Inventory
   │
   ↓
Customer
```

When a node becomes disrupted, impact should propagate visually through dependent entities.

Example:

```text
PORT DISRUPTED
      ↓
Routes affected
      ↓
Plants affected
      ↓
Inventory affected
      ↓
Customers affected
```

Nodes should be interactive.

Selecting a node should show relevant information.

---

# 17. SIGNALS PAGE

Show external-world intelligence.

Example:

```text
SIG-02481
17:42:08

PORT_DISRUPTION

Shanghai

Expected duration
2h

Confidence
84%

Status
REHEARSAL TRIGGERED
```

Include:

* source
* timestamp
* event type
* confidence
* severity
* affected region
* validation status

---

# 18. SCENARIO PAGE

Show the scenario tree.

```text
PORT DISRUPTION

├── 2 HOURS
│
├── 24 HOURS
│
├── 7 DAYS
│
└── PERMANENT
      │
      ├── Supplier shortage
      ├── Alternate port congestion
      └── Demand spike
```

Show:

* affected entities
* revenue exposure
* inventory impact
* service-level impact
* recovery time
* candidate strategies

---

# 19. AGENT PAGE

Agents should appear as operational processes, not assistants.

Example:

```text
SCENARIO ENGINE
────────────────────

STATUS
SIMULATING

SCENARIOS
43

EVALUATED
18

COMPLIANT
11

LAST ACTION
Permanent closure stress test

17:42:08
```

Show agent state:

```text
ACTIVE
SIMULATING
WAITING
COMPLETED
BLOCKED
REQUIRES APPROVAL
```

Do not use robot avatars or chatbot UI.

---

# 20. DECISION CENTER

Show the selected next-best action.

Example:

```text
NEXT-BEST ACTION

HYBRID RESPONSE
────────────────────

Move 40% sourcing
Mexico → US supplier

Cost
₹6.8L

Recovery
8 days

Service level
97%

Risk
LOW

Compliance
✓

Sustainability
MEDIUM
```

Then show:

```text
WHY THIS STRATEGY?

Reduces disruption exposure
while maintaining service level
within capacity and compliance
constraints.
```

Then:

```text
[ APPROVE RECOVERY ]
```

if human approval is required.

---

# 21. RECOVERY EXPERIENCE

When execution begins:

```text
EXECUTING RECOVERY

Inventory redistribution      ✓
Shipment reprioritization     ✓
Route modifications           ✓
Supplier change               ⚠
Compliance validation         ✓
```

Then:

```text
NETWORK HEALTH

48%
 ↓
67%
 ↓
84%
 ↓
96%

RECOVERY COMPLETE
```

The recovery animation is one of the major demo moments.

---

# 22. VISUAL DESIGN

The visual identity is:

> **Industrial Mission Control × Financial Terminal × Editorial Data Design**

The UI must feel like a serious operational system.

It must NOT feel like generic AI SaaS.

---

# 23. TYPOGRAPHY

Use:

### Display

**Instrument Serif**

Use for:

* major titles
* strategic statements
* important scenario headings
* editorial emphasis

### Interface

**IBM Plex Sans**

Use for:

* navigation
* body text
* labels
* controls
* tables
* metrics

### Technical

**IBM Plex Mono**

Use for:

* event IDs
* timestamps
* system states
* confidence values
* agent logs
* machine metadata

Do NOT use:

* Inter
* Roboto
* Arial
* Space Grotesk
* generic system fonts as the primary visual identity

---

# 24. COLOR

Dark-first.

Use CSS variables.

Suggested direction:

```css
:root {
  --background: #0B0D0E;
  --surface: #111416;
  --surface-raised: #171B1D;

  --text-primary: #E8E5DD;
  --text-secondary: #9A9C97;
  --text-muted: #5F6564;

  --border: #292E2F;

  --accent: #D6A84F;
  --telemetry: #62B8C8;

  --success: #73B58A;
  --warning: #D6A84F;
  --danger: #D7655A;
}
```

These are starting points.

Color should be semantic.

```text
Cyan/Blue → system information
Amber     → warning / attention
Green     → healthy / recovered
Red       → critical
```

Do NOT use purple.

Do NOT use purple as an AI indicator.

Do NOT use rainbow colors.

Do NOT make everything colorful.

---

# 25. NO GRADIENTS

Absolutely no gradients.

Do not use:

* gradient backgrounds
* gradient text
* gradient buttons
* gradient cards
* gradient borders
* gradient charts

Create depth through:

* surface contrast
* borders
* opacity
* shadows
* spacing
* typography
* layered solid surfaces

---

# 26. BACKGROUND

The background should not be a completely flat black canvas.

Use subtle CSS-only atmosphere:

* fine grid lines
* technical coordinate marks
* horizontal rules
* measurement ticks
* faint network traces
* low-opacity geometry

These should be subtle.

They should communicate:

> "Live operational environment."

They should never become decorative noise.

---

# 27. LAYOUT

Avoid predictable:

```text
CARD
CARD
CARD
CARD
```

layouts.

Use asymmetric compositions.

The network graph should occupy significant space.

Example:

```text
┌─────────────────────────────────────────────────────────┐
│ RESILIENCE AUTOPILOT                  LIVE / 17:42:08  │
├───────────────┬─────────────────────────┬───────────────┤
│ NETWORK       │                         │ EVENT         │
│ STATUS        │                         │ STREAM        │
│               │     NETWORK GRAPH       │               │
│ 97%           │                         │ SIG-02481     │
│               │                         │ SIG-02480     │
├───────────────┴─────────────────────────┬───────────────┤
│ SCENARIO REHEARSAL                      │ AGENT STATUS  │
├─────────────────────────────────────────┴───────────────┤
│ STRATEGY / EXPOSURE / RECOVERY                          │
└─────────────────────────────────────────────────────────┘
```

Desktop is the primary target.

---

# 28. CHARTS

Use charts only when they communicate useful operational information.

Useful charts include:

* network health over time
* exposure by disruption duration
* recovery time comparison
* strategy cost comparison
* service-level impact
* inventory depletion
* scenario risk
* recovery progress

Do not add charts merely because dashboards usually contain charts.

---

# 29. NETWORK GRAPH

Use React Flow or an equivalent library.

The graph should communicate real relationships.

It should NOT look like a decorative constellation.

Example:

```text
SUPPLIER
   ↓
PORT
   ↓
SHIPMENT
   ↓
PLANT
   ↓
INVENTORY
   ↓
CUSTOMER
```

Disruption should visually propagate through the graph.

---

# 30. AGENT VISUALIZATION

Agents should feel like components of a machine.

Good:

```text
SENSING AGENT
● ACTIVE

Last signal
17:42:08

Sources
3

Confidence
87%
```

During simulation:

```text
SCENARIO AGENT
◌ SIMULATING

Scenarios generated
43

Evaluated
18 / 43
```

During execution:

```text
LOGISTICS AGENT
● EXECUTING

Routes modified
14

Completed
12 / 14
```

Avoid:

* robot avatars
* chat bubbles
* cute AI icons
* anthropomorphic UI
* excessive glowing
* neon cyberpunk styling

---

# 31. MOTION

Motion should communicate causality.

The strongest sequence is:

```text
SIGNAL
 ↓
VALIDATING
 ↓
REHEARSING
 ↓
SIMULATING
 ↓
OPTIMIZING
 ↓
READY
```

Then:

```text
CONFIRMED
 ↓
RE-OPTIMIZING
 ↓
EXECUTING
 ↓
VERIFYING
 ↓
RECOVERED
```

Use CSS animations where sufficient.

Use Motion when coordinated React animations provide meaningful value.

Do not animate everything.

---

# 32. SIGNATURE INTERACTION

The primary wow moment is:

```text
SIGNAL
   ↓
SCENARIO
   ↓
IMPACT
   ↓
STRATEGIES
   ↓
DECISION
   ↓
ACTION
   ↓
RECOVERY
```

Example:

A port node becomes disrupted.

The impact propagates through the digital twin.

Scenario rehearsal begins.

Agents evaluate strategies.

The recommended strategy rises to the top.

Low-risk actions execute.

High-risk action pauses at:

```text
HUMAN APPROVAL REQUIRED
```

After approval, recovery begins.

This interaction is more important than decorative animations.

---

# 33. API STRUCTURE

Create:

```text
/api/sensing
/api/validate
/api/scenarios
/api/network
/api/agents
/api/decisions
/api/execute
```

Responsibilities:

### `/api/sensing`

Retrieve or generate external signals.

### `/api/validate`

Validate and structure events.

### `/api/scenarios`

Run scenario rehearsal.

### `/api/network`

Return digital twin state.

### `/api/agents`

Return agent states and activity.

### `/api/decisions`

Return ranked strategies and next-best action.

### `/api/execute`

Simulate execution of approved actions.

---

# 34. DEMO FALLBACK

The demo MUST work without the internet.

If USTR RSS or another external source fails:

```text
LIVE SIGNAL FAILED
       ↓
DEMO SIGNAL ACTIVATED
```

Use deterministic mock data.

The judge should never see a broken demo because an external API is unavailable.

---

# 35. DEVELOPMENT ORDER

Build incrementally.

Do NOT build everything at once.

Priority:

```text
1. Next.js foundation
2. Visual design system
3. Control Tower
4. Digital Twin
5. Scenario simulation
6. Strategy scoring
7. Domain agents
8. Orchestrator
9. Risk/governance
10. Sensing
11. Signal validation
12. Live disruption flow
13. AI reasoning
14. Demo polish
```

Every stage must leave the application runnable.

---

# 36. IF TIME RUNS OUT

The minimum viable vertical slice is:

```text
PORT SIGNAL
    ↓
STRUCTURED EVENT
    ↓
EXTREME SCENARIO
    ↓
DIGITAL TWIN IMPACT
    ↓
MULTIPLE STRATEGIES
    ↓
AGENT EVALUATION
    ↓
BEST STRATEGY
    ↓
RISK CLASSIFICATION
    ↓
HUMAN APPROVAL / AUTO EXECUTION
    ↓
RECOVERY
```

Prioritize this over secondary features.

---

# 37. DO NOT OVER-ENGINEER

Do NOT spend significant hackathon time on:

* Kubernetes
* microservices
* elaborate authentication
* production database architecture
* complex event streaming
* production SAP integration
* huge agent frameworks
* perfect digital twin physics
* excessive abstractions

A complete vertical slice is more valuable than ten unfinished systems.

---

# 38. AI / AGENT INTEGRITY

Do not fake agent behavior with meaningless loading animations.

When possible, every agent should produce structured output.

Example:

```json
{
  "agent": "logistics",
  "status": "completed",
  "recommendations": [
    {
      "route": "Busan",
      "recoveryDays": 8,
      "cost": 680000
    }
  ]
}
```

The UI can visualize this output.

Agents should contribute to the actual decision.

---

# 39. DEMO DATA INTEGRITY

Synthetic data must be clearly distinguishable from real-world facts.

Use labels such as:

**Illustrative Simulation**

or

**Demo Scenario**

Never present synthetic financial, operational, or recovery numbers as actual company results.

The FORVIA case can establish the real-world problem context, but the prototype's operational data must remain synthetic unless verified and publicly available.

---

# 40. PRODUCT PRINCIPLE

The interface and system should make this obvious:

> **We are not predicting one future.**

> **We are preparing for many possible futures.**

And when reality arrives:

> **We don't start planning. We start executing the plan we already rehearsed — then re-optimize against reality.**

The final product should feel like:

> **A machine for making difficult decisions under uncertainty.**

Not:

> **An AI application with some charts.**
