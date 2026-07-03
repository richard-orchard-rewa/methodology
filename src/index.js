// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const STAGES = [
  // ── STAGE 0 ──
  {id:'s0',num:'STAGE 0',title:'Problem Awareness & Prioritisation',
   diamond:'Pre-process · Problem selection',mode:'Converge',duration:'As needed',
   purpose:'Identify and score problems from the backlog before committing to research. The team reaches consensus on which problems are worth investigating based on evidence — not volume or instinct. Exec is informed and endorses direction.',
   questions:[
     'Is this problem real and evidenced, or assumed?',
     'Who does it affect — practitioners, service admins, clients, or a combination?',
     'How frequently do people interact with this problem?',
     'How much pain does it cause per interaction?',
     'What is the residual risk of not solving it?',
   ],
   artifacts:['Problem backlog entry','Scoring matrix output (per user group: reach, frequency, pain, residual risk)','Prioritisation decision record'],
   meetings:['Team prioritisation session (ad hoc, ~60 min)','Exec endorsement (present top problems, seek direction)'],
   exercises:'E.g. problem scoring matrix (reach, frequency of interaction, pain per interaction, residual risk) — scored separately per user group. Effort is not a scoring variable at this stage.',
   comms:[
     {a:'Project team',w:'Decision record shared — which problems were prioritised, which user groups are most affected, and why.'},
     {a:'Executive (CDO)',w:'Top prioritised problems presented for endorsement. Exec endorses direction — not a detailed approval, but confirms the team is focusing on the right things.'},
   ],
   gate:{q:'Are these the right problems to investigate?',
     d:'Team has scored problems across user groups. A prioritised list is presented to the exec for endorsement before research begins.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Research',desc:'Exec endorses the prioritised problems — team begins research.'},
       {c:'repeat',i:'↺',t:'Re-prioritise',desc:'Exec challenges direction or insufficient evidence — re-score and re-present.'},
       {c:'stop',i:'✕',t:'Stop',desc:'Problem not worth investigating right now — return to backlog.'},
     ],
     who:'Team consensus · Exec endorsement (red gate) · Delivery Manager records.'},
   roles:[
     {r:'A',n:'Delivery Manager',d:'Facilitates prioritisation; presents to exec; records decision'},
     {r:'R',n:'BA / Service Designer',d:'Leads scoring exercise; presents evidence summary across user groups'},
     {r:'C',n:'BI & Change Manager',d:'Applies improvement lens to candidate problems'},
     {r:'C',n:'Tech Lead',d:'Flags feasibility constraints or dependencies early'},
     {r:'C',n:'SMEs',d:'Validate scoring — may be practitioners or service admins depending on the problem'},
     {r:'I',n:'CDO',d:'Active team member; endorses prioritised problems in executive sponsor role'},
   ],
   footer:'Gate type: Exec Approval (red gate). Exec endorses direction before research investment is committed.',
   p2:[
     {doc:'Project Brief',action:'create',note:'The prioritisation decision record serves as the Project Brief — a lightweight document justifying the research investment.'},
     {doc:'Business Case',action:'create',note:'A lightweight initial business case: what problem, why now, rough cost of research, expected benefit.'},
     {doc:'Risk Register',action:'create',note:'Open the risk register. Capture known risks — scope assumptions, dependency risks, resource constraints.'},
     {doc:'Lessons Log',action:'create',note:'Open the lessons log from the start. Capture what the team already knows from prior work that is relevant to this problem.'},
   ],
   before:['A backlog of problems exists with at least a brief description for each.','The team has capacity for a new research sprint.','No solution has been pre-selected — this is about picking the problem, not the answer.'],
   steps:[
     {n:1,a:'Pull the candidate problems',t:'~15 min',d:'List the top 3–5 problems under consideration. Each should have at least a one-line description and a rough sense of who is affected. If a problem has no description, write one before the session.'},
     {n:2,a:'Score each problem',t:'~30 min',d:'Use the scoring matrix — rate each problem on Reach, Frequency of interaction, Pain per interaction, and Residual Risk. Score across user groups — practitioners, service admins, and clients may score differently for the same problem. Effort is not a scoring variable.'},
     {n:3,a:'Discuss and sense-check',t:'~20 min',d:'Numbers inform — they don\'t decide. Review scores as a team. Are there dependencies between problems? Is any problem actually two problems? SMEs validate that scores reflect reality, not assumptions.'},
     {n:4,a:'Select and scope',t:'~15 min',d:'Agree on the top problems to take into Research. Confirm which user groups are in scope. If a problem is too large, split it.'},
     {n:5,a:'Present to exec for endorsement',t:'~30 min',d:'Present the prioritised list to the exec. This is not a detailed approval gate — it is confirming the team is focused on the right problems. Exec endorses direction or challenges it.'},
     {n:6,a:'Record the decision',t:'~10 min',d:'Write a one-paragraph decision record: which problems were prioritised, why, which user groups are in scope, and any known constraints. File it.'},
   ],
   pitfalls:[
     {t:'Picking the loudest problem, not the most evidenced one',d:'The scoring matrix exists to give quieter, real problems a fair hearing. Require evidence for every score.'},
     {t:'Introducing effort as a scoring variable too early',d:'You don\'t know the effort yet — you haven\'t found the solution. Remove effort from prioritisation scoring. Use it only as a tiebreaker when problems score identically.'},
     {t:'Treating exec endorsement as bureaucracy',d:'Exec visibility at this stage protects the team later. If priorities shift, you have a record of what was endorsed and when.'},
   ],
   done:['The team can explain why these problems, why now, and which user groups are most affected.','A decision record exists and is filed.','The exec has endorsed the prioritised problems.','The scope of Research is agreed before anyone starts planning fieldwork.'],
  },

  // ── STAGE 1 ──
  {id:'s1',num:'STAGE 1',title:'Research',
   diamond:'Understanding the problem space',mode:'Diverge',duration:'Days to weeks (time-boxed)',
   purpose:'Go to where the work happens. Understand people, their work, and the data — without jumping to solutions. The goal is enough evidence to frame the problem clearly, not exhaustive research.',
   questions:[
     'Which user groups are most affected — practitioners, service admins, clients, or all three?',
     'What does the day-to-day actually look like for each group?',
     'Where do people lose time, dignity, or confidence?',
     'What constraints cannot be moved (clinical, legal, funding)?',
     'Is this actually a technology problem — or a process, culture, or resourcing problem?',
   ],
   artifacts:['Stakeholder & user map (across all three groups)','Interview notes / write-ups','Empathy maps per user group','Current-state journey map or process map','Data & evidence summary','Constraints register'],
   meetings:['Weekly stand-up','Sprint show-and-tell','Shadowing / contextual inquiry sessions','Research debrief (team synthesis)'],
   exercises:'E.g. stakeholder mapping, contextual inquiry / shadowing, empathy maps, 5 Whys, desk research. Time-box research — aim for just enough evidence to frame the problem, not perfect coverage.',
   comms:[
     {a:'Service locations',w:'Advance notice before researchers visit — purpose, who is coming, what participation involves. Coordinate with practitioners and service admins separately.'},
     {a:'Service Admins',w:'Specifically briefed — their workflows are a primary research focus, not an afterthought.'},
     {a:'Clinical Supervisors',w:'Briefed before any practitioner or client research begins — confirm safe and appropriate approach to participant access.'},
     {a:'Executive (CDO)',w:'Informed that research is underway; currently receiving as active team member.'},
   ],
   commsNote:'All participants — practitioners, service admins, and clients — should receive a plain-language summary of what the research is for and how their input will be used, before they agree to participate.',
   gate:{q:'Do we have enough to define the problem?',
     d:'Internal team check. Team agrees findings are evidence-based and sufficient to attempt a problem statement. This is not an exec gate — the team decides.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Define',desc:'Enough evidence gathered — team can attempt a problem statement.'},
       {c:'repeat',i:'↺',t:'More research needed',desc:'Key gaps remain — go back and fill them before defining.'},
       {c:'stop',i:'✕',t:'Stop',desc:'Research shows this is not a technology problem, or not worth pursuing. Hand off or return to backlog.'},
     ],
     who:'Team consensus · internal check (green gate) · Delivery Manager records.'},
   roles:[
     {r:'A',n:'BA / Service Designer',d:'Designs and leads all research across user groups; produces core artefacts'},
     {r:'R',n:'Delivery Manager',d:'Removes blockers; manages scope, pace, and time-box'},
     {r:'R',n:'SMEs',d:'Primary research participants — practitioners or service admins depending on the problem'},
     {r:'C',n:'BI & Change Manager',d:'Applies improvement lens; supports stakeholder engagement'},
     {r:'C',n:'Tech Lead',d:'Surfaces technical constraints early in research'},
     {r:'I',n:'CDO',d:'Active team member; informed of research progress'},
   ],
   footer:'Gate type: Internal Check (green gate). Team decides — no exec approval required at this transition.',
   p2:[
     {doc:'Risk Register',action:'update',note:'Update with newly discovered constraints — clinical, legal, funding, technical. Research often surfaces risks that weren\'t visible at Stage 0.'},
     {doc:'Business Case',action:'update',note:'Update to reflect what research found. If the problem is larger or different than expected, the business case needs to reflect that.'},
     {doc:'Lessons Log',action:'update',note:'Log what the team learned about how to run research — access challenges, participant engagement, what worked and what didn\'t.'},
   ],
   before:['Prioritisation decision record exists with agreed scope.','Service locations and Clinical Supervisors have confirmed access for research.','Participant consent approach is agreed.','No solution has been sketched — the team has a shared beginner\'s mind.'],
   steps:[
     {n:1,a:'Brief the team and align on scope',t:'~30 min',d:'Confirm which user groups are in scope, what questions the team is trying to answer, and what is already known. Document assumptions explicitly so you can test them. Set a time-box for the research phase.'},
     {n:2,a:'Do the desk research first',t:'~half day',d:'Pull together existing knowledge — prior audits, complaints data, ICIS usage data, KPIs. Set a cap. The goal is to identify gaps for primary research, not answer everything from a desk.'},
     {n:3,a:'Map stakeholders and plan engagement',t:'~30 min',d:'Plot everyone affected on a stakeholder map. Plan explicitly for practitioners, service admins, and clients separately — don\'t assume one group speaks for another.'},
     {n:4,a:'Run interviews, shadowing, and observation',t:'Time-boxed',d:'Go where the work happens. Shadow practitioners and service admins doing actual work. Interview clients with appropriate support. Debrief after each session while it is fresh. Time-box ruthlessly — just enough to be able to frame the problem.'},
     {n:5,a:'Synthesise findings as a team',t:'~half day',d:'Bring the whole team into synthesis. Use empathy maps per user group. Note what differs between practitioners and service admins — don\'t flatten them into a single "user." Ask: is this actually a technology problem?'},
     {n:6,a:'Build the evidence summary and constraints register',t:'~half day',d:'Document findings as evidence. For each key finding, note the source — quote, observation, or data point. Record constraints any solution must work within.'},
     {n:7,a:'Internal gate check',t:'~1 hour',d:'The team answers: do we have enough to define the problem? Is this actually a technology problem? Record the decision. If yes — proceed to Define.'},
   ],
   pitfalls:[
     {t:'Spending too long in research',d:'Research is time-boxed. Just enough evidence to frame the problem confidently. Problem paralysis is real — if you are discovering for weeks, you are probably over-researching.'},
     {t:'Hearing from managers instead of practitioners and service admins',d:'Managers describe what they think happens. Practitioners and service admins describe what actually happens. Make sure you get direct time with the people doing the work.'},
     {t:'Treating service admins as an afterthought',d:'Service admins carry significant administrative burden in ICIS. Plan their participation explicitly — don\'t add them as a top-up after practitioners are done.'},
     {t:'Assuming the solution is technology',d:'Research might reveal the problem is a process, culture, or resourcing issue. If so — stop and hand off. Don\'t build software for a non-software problem.'},
   ],
   done:['You can describe the problem in the language of practitioners and service admins.','You have evidence — at least a few direct conversations, observations, or data points.','You know whether this is actually a technology problem.','The constraints no solution can move are noted.','The team agrees it has enough to attempt a problem statement.'],
  },

  // ── STAGE 2 ──
  {id:'s2',num:'STAGE 2',title:'Define',
   diamond:'Framing the problem hypothesis',mode:'Converge',duration:'Days (time-boxed)',
   purpose:'Synthesise research into one sharply framed problem statement — validated by the people it describes. The output is a Problem Hypothesis: a clear statement with evidence, boundaries, and anti-goals. This is the foundation everything else builds on.',
   questions:[
     'Which patterns recur across what we heard?',
     'Who exactly are we designing for first?',
     'What is the one problem statement we will commit to?',
     'What are the boundaries — what are we explicitly NOT solving?',
     'What does success look like in measurable terms?',
   ],
   artifacts:['Affinity-clustered insight statements (2–4)','Personas per relevant user group','Validated current-state journey or process map','Problem statement (1 page) — the Problem Hypothesis','Anti-goals (explicit boundaries — what we are NOT solving)','Success measures (leading & lagging, per user group)'],
   meetings:['Affinity mapping workshop','Problem statement review with practitioners and/or service admins','Internal gate check'],
   exercises:'E.g. affinity mapping, insight statements, persona development, How Might We, impact / effort prioritisation.',
   comms:[
     {a:'Research participants',w:'Close the loop — plain-language summary of what was heard and what the team concluded. People who gave time should know their input was used.'},
     {a:'Service Admins',w:'Specifically acknowledged — their workflow perspective should be visible in the problem statement summary.'},
     {a:'Clinical Supervisors',w:'Share the problem statement for a clinical safety sense-check before Ideation begins.'},
     {a:'Executive (CDO)',w:'Problem statement and anti-goals shared for awareness. Internal gate — no exec approval required at this transition.'},
   ],
   gate:{q:'Do we have a clear, validated problem hypothesis?',
     d:'Internal team check. The problem statement is validated by at least 2–3 practitioners and/or service admins. Anti-goals are documented. Success measures are agreed. Team confirms this is worth ideating on.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Ideate & Design',desc:'Problem hypothesis is clear, validated, and bounded — team can begin ideation.'},
       {c:'repeat',i:'↺',t:'Refine the problem statement',desc:'Statement not yet validated or boundaries unclear — refine and re-check.'},
       {c:'stop',i:'✕',t:'Stop',desc:'Problem not worth solving, or better addressed another way.'},
     ],
     who:'Team consensus · internal check (green gate) · Delivery Manager records.'},
   roles:[
     {r:'A',n:'BA / Service Designer',d:'Facilitates synthesis; owns the problem statement and anti-goals artefacts'},
     {r:'R',n:'Delivery Manager',d:'Manages time-box; ensures gate happens before ideation begins'},
     {r:'R',n:'BI & Change Manager',d:'Applies improvement and viability lens; owns comms back to participants'},
     {r:'C',n:'SMEs',d:'Review and challenge the problem statement — both practitioner and service admin perspectives'},
     {r:'C',n:'Tech Lead',d:'Confirms technical constraints are reflected in scope and anti-goals'},
     {r:'I',n:'CDO',d:'Active team member; receives problem statement for awareness'},
   ],
   footer:'Gate type: Internal Check (green gate). Team decides — problem hypothesis agreed internally before ideation begins.',
   p2:[
     {doc:'Project Initiation Document (PID)',action:'create',note:'Now that the problem is validated and success measures are defined, the project can be formally initiated. The PID captures: problem statement, scope, anti-goals, success measures, team structure, approach, and budget.'},
     {doc:'Business Case',action:'update',note:'Strengthen the business case with the validated problem statement and measurable success criteria. CDO receives the updated business case alongside the problem statement.'},
     {doc:'Risk Register',action:'update',note:'Add risks identified during Define — scope risks, constraints that tighten the solution space.'},
     {doc:'Lessons Log',action:'update',note:'Log lessons from the Define process.'},
   ],
   before:['Research gate is complete and recorded.','Raw research notes, empathy maps, and evidence summary are available to the whole team.','The team has not yet started ideating on solutions.'],
   steps:[
     {n:1,a:'Run an affinity mapping session',t:'~2 hours',d:'Bring the whole team. Put all raw findings on the wall — quotes, observations, data points. Cluster into themes without labelling them first. Let the clusters name themselves.'},
     {n:2,a:'Write insight statements',t:'~1 hour',d:'For each major cluster, write one insight statement: "We noticed [observation] which makes us think [interpretation]." Keep them sharp — one sentence each. Aim for 2–4.'},
     {n:3,a:'Develop personas',t:'~1–2 hours',d:'Build one primary persona for each relevant user group based entirely on research. Note where practitioners and service admins differ — don\'t merge them.'},
     {n:4,a:'Write and test the problem statement',t:'~1 hour',d:'Draft: [User group] needs a way to [do something] because [evidence-based reason]. Test it with 2–3 practitioners and/or service admins who participated in research. Does it reflect what they told you?'},
     {n:5,a:'Document anti-goals',t:'~30 min',d:'Explicitly list what the team is NOT solving in this problem cycle. Anti-goals prevent scope creep and give the team permission to say no. E.g. "We are not solving the scheduling problem in this cycle."'},
     {n:6,a:'Define success measures',t:'~30 min',d:'For each affected user group, agree 2–3 measurable outcomes — at least one leading indicator (behaviour change) and one lagging KPI. These become the foundation for measuring whether Measure & De-Risk succeeds.'},
     {n:7,a:'Internal gate check',t:'~45 min',d:'Team reviews: is the problem statement clear? Validated? Bounded by anti-goals? Success measures agreed? If yes — proceed to Ideate & Design.'},
   ],
   pitfalls:[
     {t:'Writing the problem statement without user validation',d:'The problem statement should be validated by the people it describes. If practitioners or service admins read it and say "that\'s not quite it," keep rewriting.'},
     {t:'Starting to solution during Define',d:'Define is for framing the problem, not generating ideas. If solutions start emerging, write them down and park them. They belong in Ideate & Design.'},
     {t:'Skipping anti-goals',d:'Anti-goals are as important as goals. Without explicit boundaries, scope will expand during Ideation and everyone will have a different view of what "in scope" means.'},
   ],
   done:['One clear problem statement (Problem Hypothesis) exists, validated by research participants.','Anti-goals are documented — the team knows explicitly what it is NOT solving.','Success measures are agreed — at least one leading and one lagging indicator per user group.','The team agrees this problem is worth ideating on.'],
  },

  // ── STAGE 3 ──
  {id:'s3',num:'STAGE 3',title:'Ideate & Design',
   diamond:'Building the solution hypothesis',mode:'Diverge',duration:'Days to weeks (time-boxed)',
   purpose:'Generate possible solutions to the validated problem, converge on the most promising, and produce enough of a design to define a Solution Hypothesis. The output is not a built product — it is a well-evidenced idea with an associated risk list for de-risking.',
   questions:[
     'What are all the possible ways we could solve this problem?',
     'Which assumptions, if wrong, would sink each option?',
     'What does the solution need to do — and what does it explicitly NOT need to do (anti-goals)?',
     'What risks need to be de-risked before we commit to building?',
     'What does a draft service design (To Be) look like?',
   ],
   artifacts:['Idea long-list','Concept sketches or posters (top 3–5)','Solution Hypothesis — the chosen direction with rationale','Draft Service Design (To Be) — how the solution fits into the service','Risk list: ideas and associated risks that need de-risking','Anti-goals confirmed or updated'],
   meetings:['Ideation workshop (Crazy 8s, brainwriting, HMW prompts)','Concept review with practitioners and/or service admins','Tech feasibility check-in','Sprint show-and-tell'],
   exercises:'E.g. Crazy 8s, brainwriting, concept sketches, How Might We prompts, assumption mapping, dot voting. Keep it divergent first — generate before evaluating.',
   comms:[
     {a:'Service locations',w:'Contacted to give input on concepts if needed. Recruit from both practitioners and service admins where both are affected.'},
     {a:'Service Admins',w:'Involved in concept review in their own right — their workflow perspective may surface different issues than practitioners.'},
     {a:'Clinical Supervisors',w:'Consulted on any concepts touching clinical safety or content — e.g. question wording, client communication approach.'},
     {a:'Executive (CDO)',w:'Active team member; aware of ideation progress through stand-ups.'},
   ],
   commsNote:'Concepts should always be framed as ideas under exploration — not decisions already made. This protects honest feedback from participants.',
   gate:{q:'Do we have a Solution Hypothesis worth de-risking?',
     d:'Internal team check. The team has converged on a direction. A risk list is documented. The team agrees the solution hypothesis is worth investing in de-risking before committing to build.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Measure & De-Risk',desc:'Solution hypothesis is clear and the risk list is ready — begin targeted de-risking.'},
       {c:'repeat',i:'↺',t:'More ideation needed',desc:'No clear direction yet — generate more ideas or revisit the problem statement.'},
       {c:'stop',i:'✕',t:'Stop',desc:'No viable solution found — return to problem statement or backlog.'},
     ],
     who:'Team consensus · internal check (green gate) · Delivery Manager records.'},
   roles:[
     {r:'A',n:'BA / Service Designer',d:'Leads ideation and design; owns Solution Hypothesis and Draft Service Design artefacts'},
     {r:'R',n:'Tech Lead',d:'Feasibility lens on concepts; flags ICIS constraints early; participates from day one'},
     {r:'R',n:'Delivery Manager',d:'Manages time-box, scope, and risk register input'},
     {r:'R',n:'SMEs',d:'Participate in ideation and concept review — practitioners and/or service admins'},
     {r:'C',n:'BI & Change Manager',d:'Change impact perspective on emerging concepts'},
     {r:'I',n:'CDO',d:'Active team member; aware through stand-ups'},
   ],
   footer:'Gate type: Internal Check (green gate). Team decides — Solution Hypothesis agreed before de-risking begins.',
   p2:[
     {doc:'Work Packages',action:'create',note:'As a solution direction is chosen, define Work Packages for the de-risking activities. Each Work Package describes what is to be tested, quality expectations, and how success will be confirmed.'},
     {doc:'Business Case',action:'update',note:'Update with solution direction and initial effort indicators. The business case should reflect the chosen hypothesis.'},
     {doc:'Risk Register',action:'update',note:'Add technology and design risks surfaced during ideation — ICIS constraints, integration risks, usability risks identified during concept review.'},
     {doc:'Lessons Log',action:'update',note:'Log what ideation and concept review taught the team.'},
   ],
   before:['Define gate is complete. Problem Hypothesis and anti-goals are clear.','The team has not yet committed to any solution.','Tech Lead is in the room from day one.'],
   steps:[
     {n:1,a:'Run a broad ideation session',t:'~2 hours',d:'Generate as many ideas as possible before evaluating any of them. Use Crazy 8s, brainwriting, or How Might We prompts. Include practitioners and service admins in ideation where possible. Suspend judgment completely.'},
     {n:2,a:'Cluster and evaluate ideas',t:'~1 hour',d:'Group similar ideas. Use dot voting or impact/effort mapping to identify the 2–4 concepts worth developing. Tech Lead flags any that are technically impossible given ICIS constraints.'},
     {n:3,a:'Develop concept sketches',t:'~half day',d:'For each shortlisted concept, sketch what it looks like — enough to discuss and test. Keep them rough. The goal is to understand the idea, not polish it.'},
     {n:4,a:'Develop a Draft Service Design (To Be)',t:'~half day',d:'Map out how the chosen solution fits into the service — what changes for practitioners, service admins, and clients. Where does the solution touch the existing workflow? This doesn\'t need to be final.'},
     {n:5,a:'Document the risk list',t:'~1 hour',d:'For the chosen solution hypothesis, list the risks that need to be de-risked before committing to build. Prioritise: which risks, if unaddressed, would cause the solution to fail? These drive the Measure & De-Risk stage.'},
     {n:6,a:'Internal gate check',t:'~45 min',d:'Team reviews: is there a clear Solution Hypothesis? Is the risk list documented? Is the team confident enough to invest in de-risking? If yes — proceed.'},
   ],
   pitfalls:[
     {t:'Jumping to the first obvious idea',d:'The first five ideas are almost always obvious. Keep generating. Set a minimum count before evaluating. The interesting solutions appear after you\'ve exhausted the obvious ones.'},
     {t:'Confusing Ideate & Design with software development',d:'This stage does not produce code. It produces a well-evidenced idea and a design. Software development happens in Stage 5 — Develop & Deploy.'},
     {t:'Building too much before de-risking',d:'The goal is a solution hypothesis, not a prototype. Enough design to know what needs to be de-risked — no more.'},
   ],
   done:['A Solution Hypothesis exists — the team has a clear, agreed direction.','A Draft Service Design (To Be) exists — enough to understand how the solution fits the service.','A risk list exists — the team knows what needs to be de-risked and why.','The team agrees the solution hypothesis is worth investing in de-risking.'],
  },

  // ── STAGE 4 ──
  {id:'s4',num:'STAGE 4',title:'Measure & De-Risk',
   diamond:'Proving the solution hypothesis',mode:'Converge',duration:'Days to weeks (depends on risks)',
   purpose:'Target the specific risks that could cause the solution to fail and address them with the minimum effort required. The output is Solution Hypothesis Proof: evidence that the solution is Desirable, Feasible, and Viable. De-risking is not always a prototype — it is whatever is cheapest that answers the question.',
   questions:[
     'Which risks from the risk list are highest priority?',
     'What is the cheapest way to answer each risk question?',
     'Is the solution Desirable — will users choose to use it?',
     'Is it Feasible — can we actually build it (ICIS constraints, integration)?',
     'Is it Viable — does it work for the organisation (clinically, operationally, commercially)?',
     'What does the data tell us about whether the solution will meet its success measures?',
   ],
   artifacts:['Risk list with addressed/unaddressed status','De-risking evidence (varies: data, spikes, user tests, workshops, process tests)','Updated Draft Service Design — refined based on de-risking findings','Solution Hypothesis Proof — summary of evidence that it is Desirable, Feasible, Viable','Updated success measures if needed'],
   meetings:['Weekly stand-up','Sprint show-and-tell','Risk review (standing agenda item — which risks need addressing this sprint)','Exec approval session (present Solution Hypothesis Proof before build begins)'],
   exercises:'E.g. usability testing with wireframes, technical spikes, data analysis, process testing, user interviews, stakeholder workshops. Match the de-risking method to the risk — not every risk needs a prototype.',
   comms:[
     {a:'Service locations',w:'Engaged for de-risking activities as needed — e.g. user testing of wireframes, process testing. Framed as experiments, not commitments.'},
     {a:'Service Admins',w:'Involved in de-risking where their workflows are affected — usability testing, process review, feedback on Draft Service Design.'},
     {a:'Clinical Supervisors',w:'Consulted where de-risking touches clinical safety — e.g. question wording, client communication, data sensitivity.'},
     {a:'Executive (CDO)',w:'Exec approval gate: Solution Hypothesis Proof presented. Exec confirms the team can proceed to Develop & Deploy. This is the key exec decision point before significant build investment begins.'},
     {a:'SteerCo / Board',w:'Monthly update — solution hypothesis proven, moving into development.'},
   ],
   commsNote:'De-risking activities should be framed as experiments — not as the final solution. This protects honest feedback and manages expectations across the organisation.',
   gate:{q:'Is the solution hypothesis proven — is it Desirable, Feasible, and Viable?',
     d:'Exec approval gate. The team presents the Solution Hypothesis Proof to the exec. The exec confirms the team can proceed to Develop & Deploy. This is the most significant decision point — it commits to building.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Develop & Deploy',desc:'Exec confirms: solution is proven — proceed to build. (Red gate — exec approval required.)'},
       {c:'repeat',i:'↺',t:'More de-risking needed',desc:'Key risks unresolved — address them before proceeding.'},
       {c:'descope',i:'◎',t:'Descope the solution',desc:'Solution viable but too broad — narrow scope and re-test.'},
       {c:'stop',i:'✕',t:'Stop',desc:'Solution hypothesis not proven — return to Ideate & Design or backlog.'},
     ],
     who:'Team presents evidence · Exec (CDO) approval required (red gate) · Delivery Manager records.'},
   roles:[
     {r:'A',n:'BA / Service Designer',d:'Designs and runs de-risking activities; owns Solution Hypothesis Proof artefact'},
     {r:'R',n:'Tech Lead',d:'Leads technical de-risking — spikes, feasibility tests, integration checks'},
     {r:'R',n:'Delivery Manager',d:'Manages time-box, risk register, and exec approval gate pack'},
     {r:'R',n:'SMEs',d:'Participate in de-risking activities — practitioners and/or service admins'},
     {r:'C',n:'BI & Change Manager',d:'Applies change impact lens; coordinates access for de-risking activities'},
     {r:'I',n:'CDO',d:'Active team member; approval required at gate before Develop & Deploy begins'},
   ],
   footer:'Gate type: Exec Approval (red gate). This is the key decision point before significant development investment. CDO approval required.',
   p2:[
     {doc:'Business Case',action:'update',note:'Update with Solution Hypothesis Proof. Now that desirability, feasibility, and viability are evidenced, the business case for development can be properly made. Present to CDO at the gate.'},
     {doc:'Risk Register',action:'update',note:'Update with de-risking outcomes. Mark addressed risks as resolved. Add any new risks surfaced during de-risking.'},
     {doc:'Lessons Log',action:'update',note:'Log what de-risking taught the team — what assumptions were wrong, what surprised them, what to do differently next time.'},
   ],
   before:['Define gate is complete. Solution Hypothesis and risk list exist.','The team knows what questions need to be answered before committing to build.','No code has been written — de-risking is the goal, not delivery.'],
   steps:[
     {n:1,a:'Prioritise the risk list',t:'~1 hour',d:'From the risk list produced in Ideate & Design, prioritise: which risks would cause the solution to fail if unaddressed? Start with those. Match each risk to the cheapest de-risking method — not every risk needs a prototype.'},
     {n:2,a:'Address Desirability risks',t:'Varies',d:'Will users choose to use it? Test with the minimum viable experiment — wireframes shown to practitioners or service admins, a process walkthrough, a conversation. You don\'t need built software to test desirability.'},
     {n:3,a:'Address Feasibility risks',t:'Varies',d:'Can we actually build it? Nathan runs technical spikes against ICIS constraints. API integrations, data model checks, performance constraints. Answer the question with the minimum amount of code.'},
     {n:4,a:'Address Viability risks',t:'Varies',d:'Does it work for the organisation — clinically, operationally, commercially? Workshops with Clinical Supervisors, process reviews with service admins, data analysis against targets. Does the solution meet the success measures defined in Define?'},
     {n:5,a:'Update the Draft Service Design',t:'~half day',d:'Refine the Draft Service Design (To Be) based on what de-risking revealed. This becomes the input to Develop & Deploy — close enough to build from, not necessarily final.'},
     {n:6,a:'Compile the Solution Hypothesis Proof',t:'~half day',d:'Document the evidence: what was tested, what was found, what risks were addressed. Is the solution Desirable, Feasible, and Viable? Be honest — partial evidence is still useful.'},
     {n:7,a:'Exec approval gate',t:'~1 hour',d:'Present the Solution Hypothesis Proof to the exec. The gate question: is this solution proven enough to commit to building? CDO approval is required before Develop & Deploy begins.'},
   ],
   pitfalls:[
     {t:'Building a polished prototype when a rough one would do',d:'De-risking asks a question. Use the cheapest thing that answers it. A sketch, a spike, a conversation, or a data pull may be enough. A polished prototype takes weeks and answers the same question.'},
     {t:'Treating de-risking as the final product',d:'The output of this stage is evidence — not a deliverable. Don\'t let de-risking activities become the solution before exec approval is sought.'},
     {t:'Skipping the exec gate',d:'This is the key decision point. Proceeding to Develop & Deploy without exec approval removes the organisation\'s ability to redirect. Don\'t skip it.'},
   ],
   done:['All priority risks have been addressed or consciously accepted.','Evidence exists for Desirability, Feasibility, and Viability.','Draft Service Design is refined and ready to build from.','The exec has reviewed the Solution Hypothesis Proof and approved proceeding to Develop & Deploy.'],
  },

  // ── STAGE 5 ──
  {id:'s5',num:'STAGE 5',title:'Develop & Deploy',
   diamond:'Building and releasing the solution',mode:'Converge',duration:'Weeks to months',
   purpose:'Build, release, and measure the solution. This is where the proven solution hypothesis becomes a real product used by real people. Delivery is incremental — start with the smallest useful version, measure, and expand. Change management is as important as technical delivery.',
   questions:[
     'What is the smallest useful version we can release first?',
     'Does it work for practitioners and service admins — or does it help one at the cost of the other?',
     'How will we support people through the change?',
     'What do our success measures tell us — are we meeting targets?',
     'What needs to change before we expand to more locations or programs?',
   ],
   artifacts:['Release plan (incremental — start small, expand)','Service blueprint (finalised current vs future state)','Change & communications plan','Measurement & benefits plan','Usability test results (per release, per user group)','Per-program configuration documentation','Retrospective & lessons log'],
   meetings:['Weekly stand-up','Sprint show-and-tell','Pre-mortem (before each significant release)','Moderated usability testing (post-release)','Adoption review check-ins','Sprint retrospective'],
   exercises:'E.g. usability testing per user group, service blueprint, change & comms plan, pre-mortem, retrospective, per-program configuration workshops.',
   comms:[
     {a:'Service locations',w:'Formal pre-release briefing for each location — what is changing, when, what support is available. Coordinate separately with practitioners and service admins.'},
     {a:'Service Admins',w:'Specifically briefed on what changes for their workflows. Per-program configuration may affect service admins differently — make this explicit.'},
     {a:'Clinical Supervisors',w:'Informed of releases; confirm clinical safety oversight is in place. Involved in configuration decisions where clinical content is affected — e.g. question wording per program.'},
     {a:'Program Managers',w:'Engaged on per-program configuration. Identified as future owners of configuration settings.'},
     {a:'Executive (CDO)',w:'Regular progress updates. Informed of adoption results. Approval sought if significant scope changes arise.'},
     {a:'SteerCo / Board',w:'Monthly update during development and rollout.'},
     {a:'Organisation-wide',w:'RAWA Connect update as rollout broadens — share what is working and what has been learned.'},
   ],
   commsNote:'Each release should be framed deliberately — not like something being done to people. Engage location management early, before staff are briefed.',
   gate:{q:'Is the solution adopted, stable, and ready to hand over to BAU?',
     d:'Team reviews adoption metrics, retrospective findings, and operational stability across all locations. Named operational owners confirm readiness for BAU handover.',
     opts:[
       {c:'proceed',i:'→',t:'Proceed to Embed & CI',desc:'Solution is stable, adopted, and operational owners are ready.'},
       {c:'repeat',i:'↺',t:'Continue Develop & Deploy',desc:'Adoption not yet sufficient or stability issues remain — keep delivering.'},
       {c:'descope',i:'◎',t:'Descope before handover',desc:'Reduce scope before handing to BAU.'},
       {c:'stop',i:'✕',t:'Stop',desc:'Solution not viable at scale — return to problem statement.'},
     ],
     who:'Team consensus · BI & Change Manager leads adoption review · named operational owners confirm readiness · Delivery Manager records.'},
   roles:[
     {r:'R',n:'Tech Lead',d:'Owns technical delivery, deployment, configuration, and production support'},
     {r:'A',n:'BI & Change Manager',d:'Owns change & comms plan; monitors adoption by user group; coordinates program managers; leads BAU readiness review'},
     {r:'R',n:'Delivery Manager',d:'Manages release plan, risks, budget, and stakeholder communications'},
     {r:'R',n:'BA / Service Designer',d:'Usability testing, service blueprint finalisation, per-program configuration workshops, quality measures'},
     {r:'R',n:'SMEs',d:'UAT; champion adoption at service locations — practitioners and/or service admins as relevant'},
     {r:'C',n:'Program Managers',d:'Define per-program configuration needs; identified as future owners of configuration'},
     {r:'C',n:'Clinical Supervisors',d:'Clinical safety oversight; confirm content governance applies across all locations'},
     {r:'I',n:'CDO',d:'Active team member; approval for significant scope changes'},
   ],
   footer:'Gate type: Internal Check (green gate) — team and operational owners confirm readiness. Exec informed.',
   p2:[
     {doc:'Work Packages',action:'update',note:'Update or create Work Packages for each significant sprint or release increment.'},
     {doc:'Issue Register',action:'create',note:'Open the issue register when the solution goes live. Capture every defect, workaround, and operational problem as it happens.'},
     {doc:'Risk Register',action:'update',note:'Update with operational and scale risks surfaced during delivery.'},
     {doc:'Business Case',action:'update',note:'Review the business case against adoption and benefits data. Are the benefits materialising?'},
     {doc:'Lessons Log',action:'update',note:'Sprint retrospective findings feed directly into the lessons log. Capture both delivery and change management lessons.'},
   ],
   before:['Measure & De-Risk gate is complete. Exec has approved proceeding to build.','Draft Service Design is ready to build from.','At least one named service location has agreed to receive the first release.','The team has capacity to support releases actively.'],
   steps:[
     {n:1,a:'Plan the first release',t:'~half day',d:'Define the smallest useful version that delivers real value. Plan the release scope, who is affected, what support is needed. Run a pre-mortem — what could go wrong?'},
     {n:2,a:'Build and release incrementally',t:'Ongoing',d:'Build in sprints. Release to the smallest appropriate audience first. Each release should be deployable and measurable. Don\'t wait for the "full" solution before releasing.'},
     {n:3,a:'Brief each location before go-live',t:'Per location',d:'Separate briefings for practitioners and service admins. Tailor each briefing to that location\'s context. Engage location management first.'},
     {n:4,a:'Run per-program configuration workshops',t:'Per program',d:'Bring together BA/Service Designer, Program Manager, and Clinical Supervisors. Agree program-specific configuration. Document every decision. This is where Program Managers start taking ownership.'},
     {n:5,a:'Monitor adoption and run usability testing',t:'Ongoing',d:'Track adoption metrics per location and per user group. Run moderated usability testing after each significant release. A location with low adoption is a signal — investigate.'},
     {n:6,a:'Run sprint retrospectives',t:'Each sprint',d:'What did we learn about the solution? What did we learn about our delivery? What would we do differently? Feed findings into the lessons log.'},
     {n:7,a:'BAU readiness review gate',t:'~1.5 hours',d:'Team reviews adoption, stability, and operational owner readiness across all locations. Named operational owners must confirm readiness before handover begins.'},
   ],
   pitfalls:[
     {t:'Declaring success because no one complained',d:'Absence of complaints is not evidence of adoption. Watch the usage data, not just the sentiment.'},
     {t:'Treating Develop & Deploy as a big bang release',d:'Release incrementally. Start with the smallest useful version, measure, and expand. A single large release is harder to recover from if something goes wrong.'},
     {t:'Forgetting change management in the rush to ship',d:'A technically working solution that people route around is not a success. The BI & Change Manager\'s role is as important as the Tech Lead\'s throughout this stage.'},
   ],
   done:['Solution is running reliably across all intended locations.','Adoption is at an acceptable level for practitioners and service admins.','Program Managers can update configuration independently.','Named operational owners have confirmed they are ready to take on BAU ownership.'],
  },

  // ── STAGE 6 ──
  {id:'s6',num:'STAGE 6',title:'Embed & CI',
   diamond:'Handover and continuous improvement',mode:'Converge',duration:'Weeks (handover) + ongoing BAU',
   purpose:'Formally hand over to operational ownership and establish continuous improvement. The project team steps back. Named owners can sustain and adapt the solution independently. CI (Continuous Improvement) means the organisation keeps measuring benefits and feeds new insights back into the problem backlog.',
   questions:[
     'Who owns this in BAU — and do they understand and accept that ownership?',
     'Can Program Managers update configuration independently?',
     'Are support, documentation, and training in place for both practitioners and service admins?',
     'How will benefits continue to be measured after the project team moves on?',
     'What new problems or insights has this solution surfaced — what goes into the backlog?',
   ],
   artifacts:['Handover pack (documentation, runbooks, configuration guide)','Named operational owner agreement','BAU support model and escalation path','Benefits-realisation plan (ongoing CI measurement)','Final retrospective & lessons logged to improvement backlog','New backlog entries from CI insights'],
   meetings:['Handover workshop(s) with operational owners','Final project retrospective','Benefits review session','Formal handover sign-off meeting'],
   exercises:'E.g. handover workshops, operational owner sign-off, benefits review, final retrospective.',
   comms:[
     {a:'Service locations',w:'Confirmation that the solution is now BAU — who to contact for support, how to raise issues. Framed as a positive milestone.'},
     {a:'Service Admins',w:'Clear guidance on the BAU support model — who to contact for help, how to raise workflow issues.'},
     {a:'Clinical Supervisors',w:'Confirmed as ongoing clinical safety owners and content governance owners — e.g. keeping question wording appropriate per program.'},
     {a:'Program Managers',w:'Confirmed as operational owners of program-level configuration. Handover pack provided.'},
     {a:'Executive (CDO)',w:'Final handover sign-off. Benefits-realisation summary presented.'},
     {a:'SteerCo / Board',w:'Workstream closure reported. Benefits summary and lessons learned shared.'},
     {a:'Organisation-wide',w:'RAWA Connect — celebrate the outcome. Acknowledge the contribution of practitioners, service admins, and clients. Feed CI insights back to the organisation.'},
   ],
   commsNote:'The handover is a meaningful moment. Acknowledge the contribution of everyone who participated — don\'t just announce a system update. And be honest about what CI measurement will continue after handover.',
   gate:{q:'Has ownership transferred cleanly and is CI in place?',
     d:'Operational owners confirm they can act independently. CI measurement is established. CDO signs off formal closure. New insights and problems feed back into the Stage 0 backlog.',
     opts:[
       {c:'proceed',i:'→',t:'Workstream closed — return to backlog',desc:'Clean handover complete. CI in place. Team returns to Stage 0 for the next problem.'},
       {c:'repeat',i:'↺',t:'Continue Embed',desc:'Owners not yet ready — continue handover support.'},
       {c:'descope',i:'◎',t:'Descope handover',desc:'Reduce what is handed over before closing.'},
     ],
     who:'Operational owners confirm readiness · CDO signs off closure · Delivery Manager records.'},
   roles:[
     {r:'R',n:'Tech Lead',d:'Produces technical documentation and runbooks; supports operational owner through transition'},
     {r:'A',n:'BI & Change Manager',d:'Owns handover process; confirms operational readiness; establishes CI measurement; logs lessons'},
     {r:'R',n:'Delivery Manager',d:'Manages handover plan; records formal closure; presents benefits summary to CDO'},
     {r:'R',n:'BA / Service Designer',d:'Produces configuration and user guides for practitioners and service admins; supports training'},
     {r:'A',n:'Program Managers',d:'Accept ownership of program-level configuration'},
     {r:'A',n:'Clinical Supervisors',d:'Accept ongoing clinical safety oversight and content governance'},
     {r:'I',n:'CDO',d:'Signs off formal closure and benefits summary'},
   ],
   footer:'After Embed & CI, the team returns to Stage 0 for the next problem. CI insights feed back into the problem backlog as new entries.',
   p2:[
     {doc:'End Project Report',action:'create',note:'The final PRINCE2 document. Covers: delivery against the original PID, business case outcomes vs. forecast, summary of issues and risks, and confirmation that all named owners have accepted responsibility.'},
     {doc:'Business Case',action:'close',note:'Final benefits review against the business case. Present to CDO at closure. Ongoing CI measurement transfers to the named operational owner.'},
     {doc:'Issue Register',action:'close',note:'All open issues resolved or formally accepted. Close the register and hand a summary to the operational owner.'},
     {doc:'Risk Register',action:'close',note:'Residual risks handed to the operational owner. Any ongoing risks documented in the BAU support model.'},
     {doc:'Lessons Log',action:'close',note:'Final retrospective entries logged. The completed lessons log feeds into the improvement backlog — not filed and forgotten.'},
   ],
   before:['Develop & Deploy gate is complete. All named operational owners have confirmed readiness.','No critical issues are outstanding.','The team has capacity for a deliberate handover.','A lessons log exists from all stages of this workstream.'],
   steps:[
     {n:1,a:'Produce the handover pack',t:'~2 days',d:'Tech Lead produces technical documentation and runbooks. BA/Service Designer produces user guides for practitioners and service admins separately. BI & Change Manager documents the BAU support model and escalation path.'},
     {n:2,a:'Run handover workshops with operational owners',t:'Per owner group',d:'Separate sessions for Program Managers, Clinical Supervisors, and location management. Walk through what they own, how to do it, and what to do when something goes wrong. Verify they can actually do it.'},
     {n:3,a:'Verify configuration ownership',t:'~1 session',d:'Have Program Managers make an actual configuration change — e.g. update a feedback question — with the team observing but not helping. If they can\'t do it independently, the handover is not complete.'},
     {n:4,a:'Establish CI measurement',t:'~half day',d:'Agree how benefits will continue to be measured after handover. Who is responsible? What cadence? What data sources? CI measurement is what turns this into learning, not just delivery.'},
     {n:5,a:'Run the final retrospective',t:'~1.5 hours',d:'Across the full workstream. What worked? What would the team do differently? Log findings to the improvement backlog. Feed new problem insights back into Stage 0.'},
     {n:6,a:'Run the benefits review',t:'~1 hour',d:'Review success measures against actual outcomes. Be honest — partial success is still useful data. Present to CDO.'},
     {n:7,a:'Formally close the workstream',t:'~30 min',d:'CDO sign-off. File the decision record, benefits summary, and lessons log. Team returns to Stage 0 — Awareness & Prioritisation — for the next problem.'},
   ],
   pitfalls:[
     {t:'A handover that is really just switching off support',d:'The test: can operational owners run this for two weeks without calling the team? If not, the handover is not complete.'},
     {t:'Skipping CI measurement setup',d:'If you don\'t establish how benefits will be measured after handover, they won\'t be. CI is what makes the methodology a learning loop, not just a delivery process.'},
     {t:'Celebrating before benefits are confirmed',d:'Completing Embed is an achievement. Realising benefits is the goal. Make sure the benefits review happens and findings are shared honestly.'},
   ],
   done:['All operational owners can operate independently — verified, not assumed.','CI measurement is established and owned.','Final retrospective findings are logged to the improvement backlog.','Benefits review is complete and results shared.','New problem insights have been fed back into the Stage 0 backlog.','Workstream is formally closed with CDO sign-off.'],
  },
];

const GATE_OPT_CLASS = {proceed:'go-proceed',repeat:'go-repeat',descope:'go-descope',stop:'go-stop'};

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

let currentMode = 'ref';
let _popstateActive = false;
let _firstNavDone = false;

function setMode(m) {
  currentMode = m;
  document.querySelectorAll('.mode-tab').forEach(b => b.classList.toggle('active', b.textContent.trim().toLowerCase().startsWith(m==='ref'?'ref':m==='play'?'play':'both')));
  if (m==='ref') { document.querySelectorAll('.ref-card').forEach(c=>c.style.display=''); document.querySelectorAll('.play-card').forEach(c=>c.style.display='none'); }
  else if (m==='play') { document.querySelectorAll('.ref-card').forEach(c=>c.style.display='none'); document.querySelectorAll('.play-card').forEach(c=>c.style.display=''); }
  else { document.querySelectorAll('.ref-card,.play-card').forEach(c=>c.style.display=''); }
}

function showStage(id) {
  document.querySelectorAll('.stage-view').forEach(v=>v.classList.remove('visible'));
  document.getElementById('view-'+(id==='overview'?'overview':id)).classList.add('visible');
  document.querySelectorAll('.stage-btn[data-stage]').forEach(b=>{
    b.classList.toggle('active', b.dataset.stage === id);
  });
  window.scrollTo(0,0);
  if (!_popstateActive) {
    const url = new URL(location.href);
    url.searchParams.set('stage', id);
    if (_firstNavDone) {
      history.pushState({stage: id}, '', url);
    } else {
      history.replaceState({stage: id}, '', url);
      _firstNavDone = true;
    }
  }
}

// Build summary cards for overview
const grid = document.getElementById('summary-grid');
STAGES.forEach(s=>{
  const card = document.createElement('div');
  card.className = `sscard ${s.id}`;
  card.innerHTML = `
    <div class="sscard-header">
      <div class="sscard-num">${s.num}</div>
      <div class="sscard-title">${s.title}</div>
      <div class="sscard-purpose">${s.purpose}</div>
    </div>
    <div class="sscard-footer">${s.mode} · ${s.duration}</div>`;
  card.onclick = ()=>maybeShowStage(s.id);
  grid.appendChild(card);
});

// Build stage views
const viewsEl = document.getElementById('stage-views');

STAGES.forEach(s=>{
  const view = document.createElement('div');
  view.id = 'view-'+s.id;
  view.className = `stage-view ${s.id}`;

  // Reference card
  const refCard = `
  <div class="card ref-card">
    <div class="card-header">
      <div class="card-kicker">${s.num} · Reference card</div>
      <div class="card-title">${s.title}</div>
      <div class="card-purpose">${s.purpose}</div>
      <div class="meta-pills">
        <span class="meta-pill">◆ ${s.mode}</span>
        <span class="meta-pill">⏱ ${s.duration}</span>
        <span class="meta-pill">${s.diamond}</span>
      </div>
      <div class="user-pills">
        <span style="font-size:11px;color:var(--ink3);">Primary users:</span>
        <span class="user-pill up-prac">Practitioners</span>
        <span class="user-pill up-admin">Service Admins</span>
        <span class="user-pill up-client">Clients</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-section left">
        <div class="sec-label">Key questions</div>
        <ul class="dot-list">${s.questions.map(q=>`<li>${q}</li>`).join('')}</ul>
        <div style="margin-top:16px">
          <div class="sec-label">Artefacts produced <span style="font-weight:400;font-style:italic;text-transform:none;letter-spacing:0;">(optional)</span></div>
          <div class="tag-wrap">${s.artifacts.map(a=>`<span class="tag tag-optional">${a}</span>`).join('')}</div>
        </div>
        ${s.p2 ? `<div class="p2-section">
          <div class="p2-label">PRINCE2 management products</div>
          <div class="tag-wrap" style="margin-bottom:8px;">${s.p2.map(p=>`<span class="p2-tag ${p.action==='update'?'update':p.action==='close'?'close':''}" title="${p.note}">${p.doc}</span>`).join('')}</div>
          <div style="display:flex;flex-direction:column;gap:6px;">${s.p2.map(p=>`
            <div style="font-size:12px;line-height:1.45;color:var(--ink2);">
              <span style=";font-size:10px;font-weight:600;color:${p.action==='create'?'#1A3E6E':p.action==='update'?'#8C5A0A':'#0F6E56'};margin-right:6px;">${p.action==='create'?'CREATE':p.action==='update'?'UPDATE':'CLOSE'}</span>
              <strong>${p.doc}</strong> — ${p.note}
            </div>`).join('')}
          </div>
        </div>` : ''}
        <div style="margin-top:16px">
          <div class="sec-label">Meetings & ceremonies</div>
          <ul class="dot-list">${s.meetings.map(m=>`<li>${m}</li>`).join('')}</ul>
          <p style="font-size:12px;color:var(--ink3);font-style:italic;margin-top:8px;line-height:1.4;">${s.exercises}</p>
        </div>
      </div>
      <div class="card-section">
        <div class="sec-label">Decision gate</div>
        <div class="gate-block">
          <div class="gate-q">${s.gate.q}</div>
          <div class="gate-desc">${s.gate.d}</div>
          <div class="gate-opts">${s.gate.opts.map(o=>`
            <div class="gate-opt ${GATE_OPT_CLASS[o.c]}">
              <span class="gate-opt-icon">${o.i}</span>
              <span><strong>${o.t}</strong> — ${o.desc}</span>
            </div>`).join('')}
          </div>
          <div class="gate-who"><strong>Who decides:</strong> ${s.gate.who}</div>
        </div>
        <div style="margin-top:16px">
          <div class="sec-label">Communications</div>
          <div class="comms-grid">${s.comms.map(c=>`
            <div class="comms-row">
              <span class="audience-pill">${c.a}</span>
              <span class="comms-what">${c.w}</span>
            </div>`).join('')}
          </div>
          ${s.commsNote?`<p class="comms-note">${s.commsNote}</p>`:''}
        </div>
        <div style="margin-top:16px">
          <div class="sec-label">Roles & RACI</div>
          <div class="raci-legend">
            <span class="raci-code rc-A" style="padding:2px 8px;width:auto;border-radius:4px;font-size:10px;">A = Accountable</span>
            <span class="raci-code rc-R" style="padding:2px 8px;width:auto;border-radius:4px;font-size:10px;">R = Responsible</span>
            <span class="raci-code rc-C" style="padding:2px 8px;width:auto;border-radius:4px;font-size:10px;">C = Consulted</span>
            <span class="raci-code rc-I" style="padding:2px 8px;width:auto;border-radius:4px;font-size:10px;">I = Informed</span>
          </div>
          <div class="raci-grid">${s.roles.map(r=>`
            <div class="raci-row">
              <span class="raci-code rc-${r.r}">${r.r}</span>
              <span class="raci-name">${r.n}</span>
              <span class="raci-desc">${r.d}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer"><strong>Note:</strong> ${s.footer}</div>
  </div>`;

  // Playbook card
  const playCard = `
  <div class="card play-card" style="display:none">
    <div class="card-header">
      <div class="card-kicker">${s.num} · Playbook — how to run this stage</div>
      <div class="card-title">How to run ${s.title}</div>
      <div class="card-purpose" style="font-style:italic">${s.mode} · ${s.duration} · ${s.diamond.split('·')[0].trim()}</div>
    </div>
    <div class="card-body">
      <div class="card-section left">
        <div class="sec-label">Before you start</div>
        <ul class="check-list">${s.before.map(b=>`<li>${b}</li>`).join('')}</ul>
        <div style="margin-top:16px">
          <div class="sec-label">You're done when</div>
          <ul class="arrow-list">${s.done.map(d=>`<li>${d}</li>`).join('')}</ul>
        </div>
        <div style="margin-top:16px">
          <div class="sec-label">Watch out for</div>
          <div class="pitfall-list">${s.pitfalls.map(p=>`
            <div class="pitfall-item">
              <span class="pitfall-icon">⚠</span>
              <div>
                <div class="pitfall-title">${p.t}</div>
                <div class="pitfall-desc">${p.d}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card-section">
        <div class="sec-label">Steps</div>
        <div class="step-list">${s.steps.map(step=>`
          <div class="step-item">
            <div class="step-top">
              <span class="step-n">${step.n}</span>
              <span class="step-action">${step.a}</span>
              <span class="step-time">${step.t}</span>
            </div>
            <div class="step-detail">${step.d}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;

  view.innerHTML = `<div class="card-set">${refCard}${playCard}</div>`;
  viewsEl.appendChild(view);
});

// Init — navigate to stage from URL param, or default to overview
showStage(new URLSearchParams(location.search).get('stage') || 'overview');

// ═══════════════════════════════════════════════════════════
// COMMENTS
// ═══════════════════════════════════════════════════════════

const COMMENTS_API = location.hostname === 'localhost'
  ? 'http://localhost:7071/api/comments'
  : 'https://methodology-api.azurewebsites.net/api/comments';
const ALLOWED_DOMAIN = '@relationshipswa.org.au';

const _HL_PALETTE = [
  { bg:'rgba(255,213,79,.35)',  bd:'rgba(245,158,11,.8)',  hover:'rgba(245,158,11,.5)'  }, // yellow
  { bg:'rgba(134,239,172,.35)', bd:'rgba(34,197,94,.8)',   hover:'rgba(34,197,94,.5)'   }, // green
  { bg:'rgba(147,197,253,.35)', bd:'rgba(59,130,246,.8)',  hover:'rgba(59,130,246,.5)'  }, // blue
  { bg:'rgba(216,180,254,.35)', bd:'rgba(168,85,247,.8)',  hover:'rgba(168,85,247,.5)'  }, // purple
  { bg:'rgba(253,186,116,.35)', bd:'rgba(249,115,22,.8)',  hover:'rgba(249,115,22,.5)'  }, // orange
  { bg:'rgba(94,234,212,.35)',  bd:'rgba(20,184,166,.8)',  hover:'rgba(20,184,166,.5)'  }, // teal
];

function _authorColor(author) {
  let h = 0;
  for (let i = 0; i < author.length; i++) h = (h * 31 + author.charCodeAt(i)) >>> 0;
  return _HL_PALETTE[h % _HL_PALETTE.length];
}

let currentStage = new URLSearchParams(location.search).get('stage') || 'overview';
let commentsOpen = false;
let currentUser = null;
let _detectedEmail = null;
let pendingAnchor = null;
let _selRange = null;

// ── TEXT SELECTION & ANCHORING ────────────────────────────────────────────

function initSelection() {
  document.addEventListener('mouseup', _onSelectionChange);
  document.addEventListener('touchend', _onSelectionChange);
  document.addEventListener('mousedown', e => {
    if (!e.target.closest('#c-sel-tip')) hideSelTip();
  });
}

function _onSelectionChange(e) {
  if (e.target.closest('#c-sel-tip, #comment-panel')) return;
  setTimeout(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { hideSelTip(); return; }
    const text = sel.toString().trim();
    if (text.length < 3) { hideSelTip(); return; }
    _selRange = sel.getRangeAt(0).cloneRange();
    const rect = _selRange.getBoundingClientRect();
    const tip = document.getElementById('c-sel-tip');
    if (!tip) return;
    const tipW = tip.offsetWidth || 160;
    tip.style.left = Math.min(Math.max(8, rect.left + rect.width / 2 - tipW / 2), window.innerWidth - tipW - 8) + 'px';
    tip.style.top  = Math.max(8, rect.top - 44) + 'px';
    tip.style.display = 'flex';
  }, 10);
}

function hideSelTip() {
  const tip = document.getElementById('c-sel-tip');
  if (tip) tip.style.display = 'none';
}

function startAnchoredComment() {
  if (!_selRange) return;
  const quote = _selRange.toString().trim();
  if (!quote) return;
  let prefix = '', suffix = '';
  try {
    const pre = document.createRange();
    pre.setStart(document.body, 0);
    pre.setEnd(_selRange.startContainer, _selRange.startOffset);
    prefix = pre.toString().slice(-40);
    const post = document.createRange();
    post.setStart(_selRange.endContainer, _selRange.endOffset);
    post.setEnd(document.body, document.body.childNodes.length);
    suffix = post.toString().slice(0, 40);
  } catch(_) {}
  pendingAnchor = { quote, prefix, suffix };
  hideSelTip();
  window.getSelection().removeAllRanges();
  if (!commentsOpen) toggleComments();
  else { updateAuthUI(); loadComments(currentStage); }
  const wrap = document.querySelector('.c-quote-wrap');
  const preview = document.getElementById('c-quote-preview');
  const clearBtn = document.getElementById('c-quote-clear-btn');
  if (wrap && preview) {
    preview.textContent = quote.length > 120 ? quote.slice(0, 117) + '…' : quote;
    wrap.style.display = 'block';
  }
  if (clearBtn) clearBtn.style.display = 'inline';
  setTimeout(() => document.getElementById('c-text')?.focus(), 150);
}

function maybeShowStage(id) {
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && sel.toString().trim().length >= 3) return;
  showStage(id);
}

function clearPendingAnchor() {
  pendingAnchor = null;
  const wrap = document.querySelector('.c-quote-wrap');
  if (wrap) wrap.style.display = 'none';
  const clearBtn = document.getElementById('c-quote-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
}

// ── HIGHLIGHT ENGINE ──────────────────────────────────────────────────────

function _buildTextMap() {
  const root = document.querySelector('.stage-view.visible') || document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const el = n.parentElement;
      if (!el) return NodeFilter.FILTER_REJECT;
      if (el.closest('#comment-panel,#c-sel-tip,script,style,noscript'))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [], offsets = [];
  let text = '';
  let n;
  while ((n = walker.nextNode())) {
    offsets.push(text.length);
    text += n.textContent;
    nodes.push(n);
  }
  return { nodes, offsets, text };
}

function _applyOneHighlight(anchor, commentId, author) {
  const map = _buildTextMap();
  if (!anchor.quote) return;

  // Collect all occurrences of the quoted text
  const matches = [];
  let pos = 0;
  while ((pos = map.text.indexOf(anchor.quote, pos)) !== -1) { matches.push(pos); pos++; }
  if (matches.length === 0) return;

  // When there are multiple matches, use stored prefix/suffix context to pick the right one
  let start;
  if (matches.length === 1) {
    start = matches[0];
  } else {
    const pre = (anchor.prefix || '').slice(-20);
    const suf = (anchor.suffix || '').slice(0, 20);
    start = matches.find(m => {
      const before = map.text.slice(Math.max(0, m - 20), m);
      const after  = map.text.slice(m + anchor.quote.length, m + anchor.quote.length + 20);
      return (!pre || before.includes(pre)) && (!suf || after.includes(suf));
    }) ?? matches[0];
  }

  const end = start + anchor.quote.length;
  for (let i = 0; i < map.nodes.length; i++) {
    const ns = map.offsets[i];
    const ne = ns + map.nodes[i].textContent.length;
    if (ne <= start || ns >= end) continue;
    const node = map.nodes[i];
    if (!node.parentNode) continue;
    const txt = node.textContent;
    const oS = Math.max(start, ns) - ns;
    const oE = Math.min(end, ne) - ns;
    const mark = document.createElement('mark');
    mark.className = 'c-hl';
    mark.dataset.cid = commentId;
    const col = _authorColor(author || '');
    mark.style.setProperty('--hl-bg', col.bg);
    mark.style.setProperty('--hl-bd', col.bd);
    mark.style.setProperty('--hl-hv', col.hover);
    mark.addEventListener('click', () => openCommentById(commentId));
    mark.textContent = txt.substring(oS, oE);
    const frag = document.createDocumentFragment();
    if (oS > 0) frag.appendChild(document.createTextNode(txt.substring(0, oS)));
    frag.appendChild(mark);
    if (oE < txt.length) frag.appendChild(document.createTextNode(txt.substring(oE)));
    node.parentNode.replaceChild(frag, node);
  }
}

function clearHighlights() {
  document.querySelectorAll('mark.c-hl').forEach(m => {
    if (!m.parentNode) return;
    m.parentNode.replaceChild(document.createTextNode(m.textContent), m);
    m.parentNode?.normalize();
  });
}

function applyHighlights(comments) {
  clearHighlights();
  comments.filter(c => c.quote).forEach(c => _applyOneHighlight(c, c.id, c.author));
}

function openCommentById(id) {
  if (!commentsOpen) toggleComments();
  setTimeout(() => {
    const el = document.querySelector(`.c-item[data-cid="${id}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('c-hl-pulse');
    setTimeout(() => el.classList.remove('c-hl-pulse'), 1800);
  }, commentsOpen ? 0 : 300);
}

function setHighlightActive(commentId, on) {
  document.querySelectorAll(`mark.c-hl[data-cid="${commentId}"]`)
    .forEach(m => m.classList.toggle('c-hl-active', on));
}

async function initAuth() {
  try {
    const res = await fetch('/.auth/me');
    const data = await res.json();
    const principal = data.clientPrincipal;
    if (principal && principal.userDetails) {
      const email = principal.userDetails.toLowerCase();
      _detectedEmail = principal.userDetails;
      currentUser = email.endsWith(ALLOWED_DOMAIN) ? principal.userDetails : '__wrong_domain__';
    }
  } catch(e) {
    // /.auth/me unavailable (local dev) — allow posting without login
    currentUser = 'local-dev';
  }
}

function updateAuthUI() {
  const prompt  = document.getElementById('c-auth-prompt');
  const denied  = document.getElementById('c-auth-denied');
  const form    = document.getElementById('c-form');
  if (!prompt || !form) return;

  if (currentUser === '__wrong_domain__') {
    const emailEl = document.getElementById('c-denied-email');
    if (emailEl && _detectedEmail) emailEl.textContent = `Signed in as: ${_detectedEmail}`;
    prompt.style.display = 'none';
    denied.style.display = 'flex';
    form.style.display   = 'none';
  } else if (currentUser) {
    const label = currentUser === 'local-dev' ? 'local dev' : currentUser;
    document.getElementById('c-user-label').textContent = label;
    prompt.style.display = 'none';
    denied.style.display = 'none';
    form.style.display   = 'flex';
  } else {
    prompt.style.display = 'flex';
    denied.style.display = 'none';
    form.style.display   = 'none';
  }
}

// Track which stage is active so comments load on stage switch
const _origShowStage = showStage;
window.showStage = function(id) {
  _origShowStage(id);
  currentStage = id;
  if (commentsOpen) loadComments(id);
  updateCommentStageLabel(id);
};

function updateCommentStageLabel(id) {
  const el = document.getElementById('comment-stage-label');
  if (!el) return;
  const names = { overview:'Overview', s0:'Stage 0', s1:'Stage 1', s2:'Stage 2',
                  s3:'Stage 3', s4:'Stage 4', s5:'Stage 5', s6:'Stage 6' };
  el.textContent = names[id] || id;
}

function toggleComments() {
  commentsOpen = !commentsOpen;
  const panel = document.getElementById('comment-panel');
  const btn   = document.getElementById('comment-fab');
  panel.style.transform = commentsOpen ? 'translateX(0)' : 'translateX(100%)';
  btn.style.display = commentsOpen ? 'none' : 'flex';
  if (commentsOpen) { updateAuthUI(); loadComments(currentStage); }
}

async function loadComments(stage) {
  const list = document.getElementById('comment-list');
  list.innerHTML = '<div class="c-loading">Loading…</div>';
  try {
    const res = await fetch(`${COMMENTS_API}?stage=${encodeURIComponent(stage)}`);
    const data = await res.json();
    clearHighlights();
    if (!data.length) {
      list.innerHTML = '<div class="c-empty">No comments yet for this stage.</div>';
      _updateResolvedToggle(0);
      return;
    }
    list.innerHTML = data.map(c => `
      <div class="c-item${c.resolved ? ' c-resolved' : ''}" data-cid="${esc(c.id)}">
        ${c.quote ? `<div class="c-quote">${esc(c.quote)}</div>` : ''}
        <div class="c-meta">
          <span class="c-author-dot" style="background:${_authorColor(c.author).bd}"></span><span class="c-author">${esc(c.author)}</span>
          <span class="c-time">${formatDate(c.createdAt)}</span>
          ${c.resolved ? `<span class="c-resolved-tag">resolved</span>` : ''}
        </div>
        <div class="c-text">${esc(c.text)}</div>
        <div class="c-actions">
          ${currentUser ? `<button class="c-action-btn" onclick="resolveComment('${c.id}','${c.stage}')">${c.resolved ? 'Reopen' : 'Resolve'}</button>` : ''}
          ${c.author === currentUser ? `
          <button class="c-action-btn" onclick="editComment('${c.id}','${c.stage}')">Edit</button>
          <button class="c-action-btn c-action-del" onclick="deleteComment('${c.id}','${c.stage}')">Delete</button>` : ''}
        </div>
      </div>`).join('');
    // Apply show/hide for resolved comments
    const resolvedCount = data.filter(c => c.resolved).length;
    _updateResolvedToggle(resolvedCount);
    if (!showResolved) {
      list.querySelectorAll('.c-item.c-resolved').forEach(el => el.style.display = 'none');
    }
    list.scrollTop = list.scrollHeight;
    data.filter(c => c.quote).forEach(c => {
      const el = list.querySelector(`.c-item[data-cid="${c.id}"]`);
      if (!el) return;
      el.addEventListener('mouseenter', () => setHighlightActive(c.id, true));
      el.addEventListener('mouseleave', () => setHighlightActive(c.id, false));
    });
    applyHighlights(data);
  } catch(e) {
    list.innerHTML = '<div class="c-empty">Could not load comments.</div>';
  }
}

async function submitComment(e) {
  e.preventDefault();
  const author = currentUser;
  const text   = document.getElementById('c-text').value.trim();
  if (!author || !text) return;

  const btn = document.getElementById('c-submit');
  btn.disabled = true;
  btn.textContent = 'Posting…';

  try {
    const res = await fetch(COMMENTS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: currentStage, author, text, ...pendingAnchor && { quote: pendingAnchor.quote, prefix: pendingAnchor.prefix, suffix: pendingAnchor.suffix } })
    });
    if (res.ok) {
      document.getElementById('c-text').value = '';
      clearPendingAnchor();
      await loadComments(currentStage);
      loadNavCounts();
    } else {
      alert('Could not post comment — please try again.');
    }
  } catch(e) {
    alert('Could not reach the comments API. Check the URL is configured.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Post';
  }
}

function editComment(id, stage) {
  const item = document.querySelector(`.c-item[data-cid="${id}"]`);
  if (!item) return;
  const textEl = item.querySelector('.c-text');
  const original = textEl.innerText;
  item.dataset.originalText = original;
  const ta = document.createElement('textarea');
  ta.className = 'c-edit-area';
  ta.value = original;
  textEl.replaceWith(ta);
  const actions = item.querySelector('.c-actions');
  actions.style.display = 'none';
  const editActions = document.createElement('div');
  editActions.className = 'c-edit-actions';
  editActions.innerHTML = `
    <button class="c-action-btn" onclick="saveEdit('${id}','${stage}')">Save</button>
    <button class="c-action-btn" onclick="cancelEdit('${id}')">Cancel</button>`;
  actions.after(editActions);
  ta.focus();
}

async function saveEdit(id, stage) {
  const item = document.querySelector(`.c-item[data-cid="${id}"]`);
  if (!item) return;
  const ta = item.querySelector('.c-edit-area');
  const newText = ta.value.trim();
  if (!newText) return;
  const saveBtn = item.querySelector('.c-edit-actions .c-action-btn');
  if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Saving…'; }
  try {
    const res = await fetch(`${COMMENTS_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, author: currentUser, text: newText })
    });
    if (res.ok) { await loadComments(currentStage); }
    else { alert('Could not save edit.'); if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Save'; } }
  } catch(e) {
    alert('Could not reach the API.');
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Save'; }
  }
}

function cancelEdit(id) {
  const item = document.querySelector(`.c-item[data-cid="${id}"]`);
  if (!item) return;
  const ta = item.querySelector('.c-edit-area');
  const textEl = document.createElement('div');
  textEl.className = 'c-text';
  textEl.innerHTML = esc(item.dataset.originalText || '');
  ta.replaceWith(textEl);
  item.querySelector('.c-edit-actions')?.remove();
  item.querySelector('.c-actions').style.display = 'flex';
}

async function deleteComment(id, stage) {
  if (!confirm('Delete this comment?')) return;
  try {
    const res = await fetch(
      `${COMMENTS_API}/${id}?stage=${encodeURIComponent(stage)}&author=${encodeURIComponent(currentUser)}`,
      { method: 'DELETE' }
    );
    if (res.ok) { await loadComments(currentStage); loadNavCounts(); }
    else { alert('Could not delete comment.'); }
  } catch(e) {
    alert('Could not reach the API.');
  }
}

async function resolveComment(id, stage) {
  try {
    const res = await fetch(
      `${COMMENTS_API}/${id}/resolve?stage=${encodeURIComponent(stage)}&author=${encodeURIComponent(currentUser || '')}`,
      { method: 'POST' }
    );
    if (res.ok) { await loadComments(currentStage); loadNavCounts(); }
    else { alert('Could not update comment.'); }
  } catch(e) {
    alert('Could not reach the API.');
  }
}

let showResolved = false;

function toggleShowResolved() {
  showResolved = !showResolved;
  const btn = document.getElementById('c-toggle-resolved');
  if (btn) btn.textContent = showResolved ? 'Hide resolved' : _resolvedToggleLabel;
  document.querySelectorAll('#comment-list .c-item.c-resolved').forEach(el => {
    el.style.display = showResolved ? '' : 'none';
  });
}

let _resolvedToggleLabel = '';
function _updateResolvedToggle(count) {
  const btn = document.getElementById('c-toggle-resolved');
  if (!btn) return;
  if (count === 0) {
    btn.style.display = 'none';
  } else {
    btn.style.display = '';
    _resolvedToggleLabel = `Show ${count} resolved`;
    btn.textContent = showResolved ? 'Hide resolved' : _resolvedToggleLabel;
  }
}

async function loadNavCounts() {
  try {
    const res = await fetch(`${COMMENTS_API}/counts`);
    if (!res.ok) return;
    const counts = await res.json();
    document.querySelectorAll('.stage-btn[data-stage]').forEach(btn => {
      const n = counts[btn.dataset.stage] || 0;
      const existing = btn.querySelector('.stage-count-badge');
      if (existing) existing.remove();
      if (n > 0) {
        const badge = document.createElement('span');
        badge.className = 'stage-count-badge';
        badge.textContent = n;
        btn.appendChild(badge);
      }
    });
  } catch(e) {}
}

async function downloadCommentsCSV() {
  const btn = document.getElementById('c-export-btn');
  if (btn) { btn.disabled = true; btn.textContent = '…'; }

  const stages = ['overview','s0','s1','s2','s3','s4','s5','s6'];
  const stageLabels = { overview:'Overview', s0:'Stage 0', s1:'Stage 1', s2:'Stage 2',
                        s3:'Stage 3', s4:'Stage 4', s5:'Stage 5', s6:'Stage 6' };

  try {
    const results = await Promise.all(stages.map(async s => {
      try {
        const res = await fetch(`${COMMENTS_API}?stage=${encodeURIComponent(s)}`);
        return res.ok ? (await res.json()).map(c => ({ ...c, _stageLabel: stageLabels[s] || s })) : [];
      } catch(_) { return []; }
    }));

    const all = results.flat().sort((a, b) => {
      const si = stages.indexOf(a.stage) - stages.indexOf(b.stage);
      return si !== 0 ? si : new Date(a.createdAt) - new Date(b.createdAt);
    });

    if (all.length === 0) { alert('No comments found.'); return; }

    const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const headers = ['Stage','Author','Date','Highlighted text','Comment','Resolved','Resolved by'];
    const rows = all.map(c => [
      q(c._stageLabel),
      q(c.author),
      q(formatDate(c.createdAt)),
      q(c.quote || ''),
      q(c.text),
      q(c.resolved ? 'Yes' : 'No'),
      q(c.resolvedBy || ''),
    ].join(','));

    const csv = [headers.map(q).join(','), ...rows].join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rawa-comments-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch(e) {
    alert('Could not export comments.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '↓ CSV'; }
  }
}

function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/\n/g,'<br>');
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { day:'numeric', month:'short' }) + ' ' +
         d.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit' });
}

// Inject comment panel + FAB into DOM
document.body.insertAdjacentHTML('beforeend', `
<style>
#comment-fab {
  position: fixed; bottom: 28px; right: 28px; z-index: 200;
  width: 52px; height: 52px; border-radius: var(--r-pill);
  background: var(--rawa-navy); color: white;
  border: none; font-size: 22px; cursor: pointer;
  box-shadow: var(--shadow-card-lifted);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
#comment-fab:hover { background: var(--rawa-blue); }

#comment-panel {
  position: fixed; top: 52px; right: 0; bottom: 0; z-index: 199;
  width: 340px; background: white;
  box-shadow: -4px 0 24px rgba(0,0,0,0.12);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.25s ease;
}
.c-panel-header {
  background: var(--rawa-navy); color: white;
  padding: 14px 18px; flex-shrink: 0;
}
.c-panel-title {
  font-size: 13px; font-weight: var(--fw-bold); margin-bottom: 2px;
}
.c-panel-sub {
  font-size: 11px; opacity: 0.7; font-weight: var(--fw-medium);
}
#comment-list {
  flex: 1; overflow-y: auto; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
  background: var(--rawa-grey-100);
}
.c-item {
  background: white; border-radius: var(--r-sm);
  padding: 10px 12px; box-shadow: var(--shadow-card);
}
.c-meta {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 5px; gap: 8px;
}
.c-author { font-size: 12px; font-weight: var(--fw-bold); color: var(--rawa-navy); }
.c-time   { font-size: 10px; color: var(--ink3); font-weight: var(--fw-medium); white-space: nowrap; }
.c-text   { font-size: 13px; color: var(--ink2); line-height: 1.5; font-weight: var(--fw-medium); }
.c-loading, .c-empty {
  font-size: 13px; color: var(--ink3); text-align: center;
  padding: 24px 12px; font-weight: var(--fw-medium); font-style: italic;
}
.c-form {
  border-top: 1px solid var(--divider); padding: 12px;
  display: flex; flex-direction: column; gap: 8px; flex-shrink: 0;
  background: white;
}
.c-form input, .c-form textarea {
  width: 100%; font-family: var(--font-sans); font-size: 13px;
  font-weight: var(--fw-medium); padding: 8px 10px;
  border: 1px solid var(--rawa-grey-300); border-radius: var(--r-sm);
  color: var(--rawa-ink); outline: none; resize: none; box-sizing: border-box;
}
.c-form input:focus, .c-form textarea:focus {
  border-color: var(--rawa-blue); border-width: 1.5px;
}
.c-form textarea { min-height: 72px; }
#c-submit {
  padding: 8px 20px;
  background: var(--rawa-navy); color: white;
  border: none; border-radius: var(--r-pill);
  font-family: var(--font-sans); font-size: 13px;
  font-weight: var(--fw-semibold); cursor: pointer;
  transition: background 0.15s;
}
#c-submit:hover { background: var(--rawa-blue); }
#c-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.c-auth-box {
  border-top: 1px solid var(--divider); padding: 16px 12px;
  display: flex; flex-direction: column; align-items: center;
  gap: 10px; background: white; flex-shrink: 0;
}
.c-auth-msg { font-size: 13px; color: var(--ink2); text-align: center; margin: 0; font-weight: var(--fw-medium); }
.c-auth-btn {
  padding: 8px 20px; background: var(--rawa-navy); color: white;
  border-radius: var(--r-pill); font-size: 13px; font-weight: var(--fw-semibold);
  text-decoration: none; transition: background 0.15s;
}
.c-auth-btn:hover { background: var(--rawa-blue); }
.c-user-row {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
}
.c-user-label { font-size: 12px; color: var(--ink2); font-weight: var(--fw-medium); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.c-signout { font-size: 11px; color: var(--ink3); text-decoration: underline; cursor: pointer; white-space: nowrap; }
.c-signout:hover { color: var(--rawa-navy); }
#c-sel-tip {
  position: fixed; z-index: 300; display: none;
  align-items: center; gap: 6px;
  background: var(--rawa-navy); color: white;
  border-radius: var(--r-pill); padding: 7px 16px;
  font-size: 12px; font-weight: var(--fw-semibold);
  cursor: pointer; white-space: nowrap;
  box-shadow: var(--shadow-card-lifted);
}
#c-sel-tip:hover { background: var(--rawa-blue); }
mark.c-hl {
  background: var(--hl-bg, rgba(255,213,79,.35));
  border-bottom: 2px solid var(--hl-bd, rgba(245,158,11,.8));
  border-radius: 2px; cursor: pointer; padding: 0 1px;
}
mark.c-hl:hover, mark.c-hl.c-hl-active { background: var(--hl-hv, rgba(245,158,11,.5)); }
.c-author-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 2px;
  flex-shrink: 0; margin-right: 5px; vertical-align: middle;
}
.c-quote {
  font-size: 11px; color: var(--ink3); font-style: italic;
  border-left: 3px solid var(--rawa-blue); padding: 3px 8px;
  margin-bottom: 6px; background: var(--rawa-grey-100);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.c-quote-wrap {
  display: none;
  border-left: 3px solid var(--rawa-blue); padding: 4px 8px;
  background: var(--rawa-grey-100); border-radius: 0 var(--r-sm) var(--r-sm) 0;
}
#c-quote-preview {
  font-size: 11px; color: var(--ink2); font-style: italic;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.c-form-footer {
  display: flex; justify-content: flex-end; align-items: center;
}
.c-panel-close {
  background: none; border: none; color: rgba(255,255,255,0.8); font-size: 18px;
  cursor: pointer; padding: 0 2px; line-height: 1; flex-shrink: 0;
}
.c-panel-close:hover { color: white; }
.c-export-btn {
  background: none; border: 1px solid rgba(255,255,255,0.35); border-radius: var(--r-pill);
  color: rgba(255,255,255,0.8); font-size: 11px; font-weight: var(--fw-semibold);
  font-family: var(--font-sans); cursor: pointer; padding: 3px 9px; flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;
}
.c-export-btn:hover { border-color: rgba(255,255,255,0.8); color: white; }
.c-export-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.c-quote-clear {
  font-size: 11px; color: var(--ink3); background: none;
  border: none; cursor: pointer; padding: 0; font-family: var(--font-sans);
  font-weight: var(--fw-medium);
}
.c-quote-clear:hover { color: var(--rawa-navy); }
@keyframes c-pulse { 0%,100%{outline-color:transparent} 50%{outline-color:var(--rawa-blue)} }
.c-item.c-hl-pulse { outline: 2px solid var(--rawa-blue); outline-offset: 2px; animation: c-pulse 0.6s ease 3; }
.c-actions, .c-edit-actions {
  display: flex; gap: 6px; justify-content: flex-end; margin-top: 6px;
}
.c-action-btn {
  font-size: 11px; padding: 2px 10px; border-radius: var(--r-pill);
  border: 1px solid var(--rawa-grey-300); background: white;
  color: var(--ink2); cursor: pointer; font-family: var(--font-sans);
  font-weight: var(--fw-medium); transition: border-color 0.15s, color 0.15s;
}
.c-action-btn:hover { border-color: var(--rawa-blue); color: var(--rawa-blue); }
.c-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.c-action-del:hover { border-color: #e53e3e; color: #e53e3e; }
.c-edit-area {
  width: 100%; font-family: var(--font-sans); font-size: 13px;
  font-weight: var(--fw-medium); padding: 6px 8px; margin-top: 4px;
  border: 1.5px solid var(--rawa-blue); border-radius: var(--r-sm);
  color: var(--rawa-ink); resize: vertical; box-sizing: border-box; min-height: 60px;
}
@media (max-width: 600px) {
  #comment-panel { width: 100%; }
  #comment-fab { bottom: 16px; right: 16px; }
}
</style>

<div id="c-sel-tip" onclick="startAnchoredComment()">💬 Comment on selection</div>

<button id="comment-fab" onclick="toggleComments()" title="Comments">💬</button>

<div id="comment-panel">
  <div class="c-panel-header">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <div>
        <div class="c-panel-title">Comments — <span id="comment-stage-label">Overview</span></div>
        <div class="c-panel-sub">Visible to the RAWA team.</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        <button id="c-toggle-resolved" class="c-toggle-resolved" onclick="toggleShowResolved()" style="display:none">Show resolved</button>
        <button id="c-export-btn" class="c-export-btn" onclick="downloadCommentsCSV()" title="Download all comments as CSV">↓ CSV</button>
        <button class="c-panel-close" onclick="toggleComments()" title="Close">✕</button>
      </div>
    </div>
  </div>
  <div id="comment-list"></div>
  <div id="c-auth-prompt" class="c-auth-box" style="display:none">
    <p class="c-auth-msg">Sign in to leave a comment.</p>
    <a href="/.auth/login/aad?post_login_redirect_uri=/" class="c-auth-btn">Sign in with Microsoft</a>
  </div>
  <div id="c-auth-denied" class="c-auth-box" style="display:none">
    <p class="c-auth-msg">Only @relationshipswa.org.au accounts can comment.<br><small id="c-denied-email" style="opacity:0.7"></small></p>
    <a href="/.auth/logout?post_logout_redirect_uri=/" class="c-auth-btn">Sign out</a>
  </div>
  <form id="c-form" class="c-form" onsubmit="submitComment(event)" style="display:none">
    <div class="c-user-row">
      <span id="c-user-label" class="c-user-label"></span>
      <a href="/.auth/logout?post_logout_redirect_uri=/" class="c-signout">Sign out</a>
    </div>
    <div class="c-quote-wrap">
      <span id="c-quote-preview"></span>
    </div>
    <textarea id="c-text" placeholder="Add a comment…" maxlength="1000" required></textarea>
    <div class="c-form-footer">
      <button type="button" id="c-quote-clear-btn" class="c-quote-clear" onclick="clearPendingAnchor()" style="display:none;margin-right:auto">× Clear quote</button>
      <button id="c-submit" type="submit">Post</button>
    </div>
  </form>
</div>
`);
initAuth();
initSelection();
loadNavCounts();
loadComments(currentStage);

window.addEventListener('popstate', e => {
  _popstateActive = true;
  window.showStage(e.state?.stage || new URLSearchParams(location.search).get('stage') || 'overview');
  _popstateActive = false;
});
