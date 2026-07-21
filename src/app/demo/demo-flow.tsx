"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CircleAlert, Eye, Lightbulb, RotateCcw, SearchCheck } from "lucide-react";
import type { LearnerAttempt, MisconceptionHypothesis } from "@/lib/domain";
import { mockDiagnosisAdapter } from "@/lib/mock-ai";
import { outcome, source } from "@/lib/seed";

type Stage = "attempt" | "diagnosis" | "practice" | "transfer" | "verified";

const stageLabels: Record<Stage, string> = {
  attempt: "Attempt", diagnosis: "Review reasoning", practice: "Targeted practice", transfer: "Transfer check", verified: "Verified",
};

export function DemoFlow() {
  const [stage, setStage] = useState<Stage>("attempt");
  const [answer, setAnswer] = useState("The mean is $88,000, so that is the typical salary.");
  const [reasoning, setReasoning] = useState("The mean includes every employee's salary, which makes it more accurate than the median.");
  const [diagnosis, setDiagnosis] = useState<MisconceptionHypothesis | null>(null);
  const [practiceChoice, setPracticeChoice] = useState("");
  const [transferChoice, setTransferChoice] = useState("");
  const [message, setMessage] = useState("");

  const stageIndex = useMemo(() => Object.keys(stageLabels).indexOf(stage), [stage]);

  async function submitAttempt() {
    if (reasoning.trim().length < 20) {
      setMessage("Add a little more reasoning so the feedback can use your evidence.");
      return;
    }
    const attempt: LearnerAttempt = { id: "attempt-maya-1", outcomeId: outcome.id, answer, reasoning, confidence: "high", submittedAt: new Date().toISOString() };
    setDiagnosis(await mockDiagnosisAdapter.diagnose(attempt));
    setMessage("");
    setStage("diagnosis");
  }

  function reset() {
    setStage("attempt"); setDiagnosis(null); setPracticeChoice(""); setTransferChoice(""); setMessage("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/"><span aria-hidden="true">P</span>ProofPath</Link>
        <nav aria-label="Demo navigation">
          <Link className="side-link" href="/"><ArrowLeft size={18}/> Back to overview</Link>
          <span className="side-link active"><BookOpen size={18}/> Learning workspace</span>
          <Link className="side-link" href="/instructor/interventions"><SearchCheck size={18}/> Instructor view</Link>
        </nav>
        <div className="demo-note"><strong>Guided demo</strong><p>This local experience uses deterministic responses, not a live AI model.</p></div>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div><p className="kicker">Data Literacy Foundations · Outcome 2</p><h1>{outcome.title}</h1></div>
          <button className="button secondary compact" onClick={reset}><RotateCcw size={16}/> Reset demo</button>
        </header>

        <ol className="progress-steps" aria-label="Learning progress">
          {Object.entries(stageLabels).map(([key, label], index) => <li key={key} className={index < stageIndex ? "done" : index === stageIndex ? "current" : ""}><span>{index < stageIndex ? <Check size={14}/> : index + 1}</span>{label}</li>)}
        </ol>

        {stage === "attempt" && <div className="content-grid">
          <section className="panel"><p className="kicker">Scenario</p><h2>Which salary best represents this team?</h2><p>A seven-person team earns $52k, $57k, $61k, $64k, $68k, $72k, and $242k. A report calls $88k the “typical salary.” Evaluate that choice.</p>
            <label>Answer<textarea value={answer} onChange={e => setAnswer(e.target.value)} /></label>
            <label>Explain your reasoning <span>Required</span><textarea value={reasoning} onChange={e => setReasoning(e.target.value)} /></label>
            {message && <p className="form-error" role="alert"><CircleAlert size={17}/>{message}</p>}
            <button className="button primary" onClick={submitAttempt}>Review my reasoning <ArrowRight size={17}/></button>
          </section>
          <aside className="panel source-panel"><p className="kicker"><BookOpen size={15}/> Approved source</p><blockquote>{source.excerpt}</blockquote><small>{source.title} · {source.locator}</small><h3>Success criteria</h3>{outcome.rubric.map(item => <div className="criterion" key={item.id}><Check size={16}/><div><strong>{item.label}</strong><p>{item.description}</p></div></div>)}</aside>
        </div>}

        {stage === "diagnosis" && diagnosis && <div className="content-grid">
          <section className="panel"><span className="badge proposed">Proposed · {Math.round(diagnosis.confidence * 100)}% confidence</span><h2>{diagnosis.label}</h2><div className="evidence-box"><strong><Eye size={17}/> Observed learner evidence</strong><blockquote>“{diagnosis.evidence}”</blockquote></div><div className="uncertainty"><CircleAlert size={18}/><p><strong>What remains uncertain</strong>{diagnosis.uncertainty}</p></div><button className="button primary" onClick={() => setStage("practice")}>Work through a scaffold <ArrowRight size={17}/></button></section>
          <aside className="panel coach-panel"><p className="kicker"><Lightbulb size={16}/> Socratic coach</p><h3>If the $242k salary increased to $500k, what would happen to the mean? What would happen to the median?</h3><details><summary>Show a hint</summary><p>Recalculate only what changes. Then ask which measure still resembles most salaries.</p></details><p className="source-cite"><BookOpen size={15}/> Grounded in {source.locator}</p></aside>
        </div>}

        {stage === "practice" && <section className="panel narrow"><p className="kicker">Targeted retrieval practice</p><h2>A neighborhood has home prices of $280k, $295k, $310k, $325k, and $1.8m. Which measure better represents a typical home price?</h2><p className="selection-reason">Selected because your first response did not account for how an extreme value changes the mean.</p><div className="choice-grid">{["Mean", "Median"].map(choice => <button key={choice} className={practiceChoice === choice ? "choice selected" : "choice"} onClick={() => setPracticeChoice(choice)}>{choice}</button>)}</div><button disabled={!practiceChoice} className="button primary" onClick={() => practiceChoice === "Median" ? setStage("transfer") : setMessage("Try again: compare how far each measure moves when the $1.8m home is included.")}>Check and continue <ArrowRight size={17}/></button>{message && practiceChoice === "Mean" && <p className="form-error" role="alert">{message}</p>}</section>}

        {stage === "transfer" && <section className="panel narrow"><span className="badge evidence">Fresh scenario</span><h2>A sensor usually reports 18–22°C but once records 92°C due to a fault. Which summary should an engineer report as typical—and why?</h2><div className="choice-grid vertical">{["Mean, because it uses every reading", "Median, because the faulty extreme distorts the mean"].map(choice => <button key={choice} className={transferChoice === choice ? "choice selected" : "choice"} onClick={() => setTransferChoice(choice)}>{choice}</button>)}</div><button disabled={!transferChoice} className="button primary" onClick={() => transferChoice.startsWith("Median") ? setStage("verified") : setMessage("Near miss: identify which measure is resistant to the faulty extreme value.")}>Verify understanding <ArrowRight size={17}/></button>{message && transferChoice.startsWith("Mean") && <p className="form-error" role="alert">{message}</p>}</section>}

        {stage === "verified" && <section className="panel verified-panel"><div className="verified-mark"><Check size={34}/></div><p className="kicker">Verified with new evidence</p><h2>You selected a resistant measure in a new context.</h2><p>Verification is based on the sensor transfer task—not repetition of the salary example.</p><div className="evidence-summary"><div><span>Outcome</span><strong>{outcome.title}</strong></div><div><span>Evidence</span><strong>Fresh transfer scenario</strong></div><div><span>Next review</span><strong>In 4 days</strong></div></div><Link className="button primary" href="/instructor/interventions">See the instructor evidence <ArrowRight size={17}/></Link></section>}
      </section>
    </main>
  );
}
