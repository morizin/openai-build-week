"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { LmsShell } from "@/components/lms-shell";
import { can } from "@/features/lms/client";
import { useLmsSession } from "@/features/lms/session-context";
const days=["MON","TUE","WED","THU","FRI","SAT","SUN"];
export default function CalendarPage(){const { activeWorkspace }=useLmsSession();const canManageEvents=activeWorkspace?can(activeWorkspace.capabilities,"course:publish"):false;return <LmsShell active="Calendar" eyebrow="SCHEDULE" title="July 2026" actions={<div className="head-actions"><button className="lms-secondary" aria-label="Previous month"><ChevronLeft size={16}/></button><button className="lms-secondary">Today</button><button className="lms-secondary" aria-label="Next month"><ChevronRight size={16}/></button>{canManageEvents&&<button className="lms-primary"><Plus size={16}/> Add event</button>}</div>}><p className="fixture-note">Preview data — calendar APIs are not connected yet.</p><div className="calendar-grid">{days.map(d=><strong key={d}>{d}</strong>)}{Array.from({length:35},(_,i)=>{const n=i-2;return <div className={n<1||n>31?"muted-day":""} key={i}><span>{n<1?30+n:n>31?n-31:n}</span>{n===3&&<i className="event violet">Live workshop · 10:00</i>}{n===7&&<i className="event cyan">DATA-101 quiz</i>}{n===14&&<i className="event amber">Project review</i>}{n===21&&<><i className="event cyan">Distribution assignment</i><i className="event red">Discussion due</i></>}</div>})}</div></LmsShell>}
