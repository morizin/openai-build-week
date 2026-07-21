import Link from "next/link";
import { ArrowLeft, Check, CircleAlert, SearchCheck, Users } from "lucide-react";

export default function InterventionsPage() {
  return <main className="instructor-page"><div className="wrap">
    <Link className="back-link" href="/demo"><ArrowLeft size={17}/> Learner demo</Link>
    <header className="workspace-header"><div><p className="kicker">Instructor workspace</p><h1>Intervention queue</h1><p>Action-ready signals grounded in learner reasoning—not activity scores.</p></div><span className="badge proposed">2 need review</span></header>
    <div className="metric-grid"><article><Users/><span>Affected learners</span><strong>2 of 18</strong></article><article><SearchCheck/><span>Shared pattern</span><strong>Outlier sensitivity</strong></article><article><Check/><span>Newly verified</span><strong>1 learner</strong></article></div>
    <section className="intervention-card"><div className="intervention-top"><div><span className="badge proposed">Under review · high confidence</span><h2>Mean and median treated as interchangeable</h2></div><span className="urgency"><CircleAlert size={16}/> Review today</span></div><p className="learner-list"><strong>Maya Chen and Jordan Lee</strong> · Choose and justify an appropriate measure of center</p><blockquote>“The mean includes every value, which makes it more accurate than the median.”</blockquote><div className="intervention-grid"><div><span>Suggested question</span><p>What stays stable if the largest value doubles: the mean or the median?</p></div><div><span>Suggested mini-lesson</span><p>Compare resistant and non-resistant statistics with one counterexample.</p></div></div><div className="actions"><button className="button primary">Approve intervention</button><button className="button secondary">Edit suggestion</button><button className="button tertiary">Correct diagnosis</button></div><p className="audit-note">Every action is recorded in the course audit trail. No message is sent without instructor approval.</p></section>
  </div></main>;
}
