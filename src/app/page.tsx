import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, CalendarDays, CheckCircle2, FileText, MessageSquare, ShieldCheck, Users } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Courses & content", text: "Organize modules, lessons, files, video, and resources in one structured course space." },
  { icon: FileText, title: "Assignments & quizzes", text: "Create activities, collect submissions, use rubrics, and return clear instructor feedback." },
  { icon: BarChart3, title: "Gradebook", text: "Track grades, weighted categories, missing work, and learner progress without spreadsheet drift." },
  { icon: CalendarDays, title: "Calendar & due dates", text: "Give every learner one dependable view of deadlines, live sessions, and course events." },
  { icon: MessageSquare, title: "Communication", text: "Keep announcements, course discussions, direct messages, and reminders connected to learning." },
  { icon: Users, title: "People & roles", text: "Support learners, instructors, reviewers, and administrators with clear permissions." },
];

export default function Home() {
  return <main className="dark-site">
    <nav className="dark-nav" aria-label="Primary navigation">
      <Link className="dark-brand" href="/"><span>PP</span> PROOFPATH</Link>
      <div className="dark-nav-links"><a href="#platform">Platform</a><a href="#features">Features</a><a href="#security">Security</a></div>
      <div className="dark-nav-actions"><Link className="dark-link" href="/dashboard">Sign in</Link><Link className="dark-button accent" href="/dashboard">Open workspace <ArrowRight size={17}/></Link></div>
    </nav>

    <section className="dark-hero" id="platform">
      <div className="hero-grid-mark" aria-hidden="true" />
      <div className="dark-eyebrow"><span /> LEARNING, ORGANIZED</div>
      <h1>One place to run<br/><em>every course.</em></h1>
      <p>ProofPath gives educators and learners a focused workspace for courses, assignments, grades, schedules, and communication.</p>
      <div className="dark-actions"><Link className="dark-button accent" href="/dashboard">Explore the LMS <ArrowRight size={18}/></Link><a className="dark-button outline" href="#features">View capabilities</a></div>
      <div className="dark-proof-line"><span><CheckCircle2 size={16}/> Accessible by design</span><span><ShieldCheck size={16}/> Role-based access</span><span><CheckCircle2 size={16}/> Built for responsive delivery</span></div>
    </section>

    <section className="product-frame" aria-label="LMS dashboard preview">
      <div className="frame-bar"><span>PROOFPATH / LEARNER WORKSPACE</span><span className="frame-status">LIVE</span></div>
      <div className="frame-content">
        <aside><strong>PP</strong>{["Overview", "Courses", "Assignments", "Calendar", "Grades", "Inbox"].map((x,i)=><span className={i===0?"active":""} key={x}>{x}</span>)}</aside>
        <div className="frame-main">
          <header><div><small>MONDAY, JULY 21</small><h2>Good morning, Maya.</h2></div><button>+ JOIN COURSE</button></header>
          <div className="preview-grid"><article className="preview-wide"><small>UP NEXT</small><strong>Statistical reasoning</strong><p>Lesson 04 · Data Literacy Foundations</p><div className="preview-progress"><i/><span>68%</span></div></article><article><small>DUE TODAY</small><strong>2 assignments</strong><p>Next due at 5:00 PM</p></article><article><small>COURSES</small><strong>4 active</strong><p>12 completed modules</p></article><article><small>GRADE AVERAGE</small><strong>89.4%</strong><p>Across active courses</p></article></div>
        </div>
      </div>
    </section>

    <section className="dark-section" id="features"><div className="section-index">01 / CORE PLATFORM</div><div className="section-heading"><h2>Everything a modern LMS needs.</h2><p>Start with dependable course operations. Add advanced learning intelligence when the foundation is ready.</p></div><div className="feature-grid">{features.map(({icon:Icon,title,text},i)=><article key={title}><span className="feature-number">0{i+1}</span><Icon size={24}/><h3>{title}</h3><p>{text}</p><span className="feature-arrow">↗</span></article>)}</div></section>

    <section className="security-strip" id="security"><div><span className="section-index">02 / BUILT FOR TRUST</span><h2>Clear boundaries.<br/>Calm operations.</h2></div><div className="security-list"><p><strong>ACCESS</strong> Role-aware workspaces and explicit permissions.</p><p><strong>ACCESSIBILITY</strong> Keyboard-first navigation and readable contrast.</p><p><strong>CONTROL</strong> Transparent activity history and export-ready data.</p></div></section>
  </main>;
}
