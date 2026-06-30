import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../context/AuthContext";
import {
  Cpu,
  Wrench,
  Code,
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Target,
  Calendar,
  Clock,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

function EarlyAccessModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("student");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { configured } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    if (configured) {
      await supabase
        .from("waitlist")
        .insert({ email: email.trim(), name: name.trim() || null, interest });
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-950 border border-gray-800 rounded-md p-8 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-md flex items-center justify-center mx-auto mb-4">
              <Check className="text-yellow-400" size={22} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">You're on the list.</h3>
            <p className="text-gray-400 text-sm">
              We'll reach out with launch pricing and early kit access when we're ready to ship.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-1 text-white">Join early access</h3>
            <p className="text-gray-500 text-sm mb-6">
              Get launch pricing and be among the first to receive a kit.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
              />
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400/50"
              >
                <option value="student">I'm a student</option>
                <option value="educator">I'm an educator / school</option>
                <option value="maker">I'm a hobbyist / maker</option>
              </select>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-yellow-400 text-gray-950 font-bold rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50"
              >
                {submitting ? "Joining..." : "Join Early Access"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />
      {showModal && <EarlyAccessModal onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="relative pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsMTYzLDE4NCwwLjA2KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-100" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-6">
                Educational Robotics
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tight mb-6">
                Build a robot.<br />
                <span className="text-yellow-400">Learn real engineering.</span>
              </h1>

              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                Assemble, code, and control a Python-programmable robotic arm. Structured lessons, real-time feedback, and a community of builders to help when you're stuck.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-8 py-4 bg-yellow-400 text-gray-950 font-bold rounded-md hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                >
                  Join Early Access
                  <ArrowRight size={18} />
                </button>
                <a
                  href="#kit"
                  className="px-8 py-4 border border-gray-700 text-gray-300 font-semibold rounded-md hover:border-gray-500 hover:text-white transition-colors flex items-center justify-center"
                >
                  Explore the Kit
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-white">3–6</div>
                  <div className="text-sm text-gray-500 mt-1">Degrees of freedom</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Python</div>
                  <div className="text-sm text-gray-500 mt-1">Primary language</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">8</div>
                  <div className="text-sm text-gray-500 mt-1">Structured lessons</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyb2JvdGljJTIwYXJtJTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzc5ODU1NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Robotic arm — replace with real product photo"
                className="rounded-md border border-gray-800 w-full"
              />
              <div className="absolute top-4 left-4 bg-gray-950/90 border border-gray-800 rounded-md px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-xs font-mono text-gray-300">ArmLab v1 — Early Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">The Problem</div>
            <h2 className="text-4xl font-bold text-white">The robotics learning gap</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Too much theory, not enough building",
                body: "Students read textbooks and watch videos but never touch real hardware or debug real systems.",
              },
              {
                icon: AlertCircle,
                title: "Expensive lab equipment",
                body: "Professional robots cost thousands and require lab space most students don't have access to.",
              },
              {
                icon: X,
                title: "No guidance when things go wrong",
                body: "Scattered tutorials and DIY kits leave students stuck without support when motors misbehave.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-gray-800 rounded-md p-6 bg-gray-900/20">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-md flex items-center justify-center mb-5">
                  <Icon className="text-red-400" size={20} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-l-2 border-yellow-400 pl-6">
            <p className="text-gray-300 text-lg">
              ArmLab gives students one structured kit that combines hardware, software, community, and real-time feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Kit */}
      <section id="kit" className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">The Kit</div>
              <h2 className="text-4xl font-bold text-white mb-4">ArmLab Starter Kit</h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                A compact robotic arm designed for students to learn assembly, motion control, kinematics, calibration, and automation — with Python or Arduino.
              </p>

              <img
                src="https://images.unsplash.com/photo-1637002722490-5f8ceed9774c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxyb2JvdGljJTIwYXJtJTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzc5ODU1NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Robotic arm kit components"
                className="rounded-md border border-gray-800 w-full"
              />
            </div>

            <div className="lg:pt-16">
              <div className="border border-gray-800 rounded-md divide-y divide-gray-800">
                <div className="px-6 py-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">What's included</span>
                  <span className="text-xs px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded font-medium">
                    Early access pricing
                  </span>
                </div>
                {[
                  "Robotic arm structural parts",
                  "Controller board",
                  "Servo / stepper motors",
                  "Gripper end-effector",
                  "Wires and assembly tools",
                  "USB / Bluetooth module",
                  "Sensor module",
                  "Step-by-step assembly guide",
                  "Lesson platform access",
                  "Real-time feedback dashboard",
                ].map((item) => (
                  <div key={item} className="px-6 py-3 flex items-center gap-3">
                    <Check className="text-yellow-400 shrink-0" size={16} />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
                <div className="px-6 py-5 flex gap-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 py-2.5 bg-yellow-400 text-gray-950 font-bold text-sm rounded-md hover:bg-yellow-300 transition-colors"
                  >
                    Join Early Access
                  </button>
                  <a
                    href="#curriculum"
                    className="px-4 py-2.5 border border-gray-700 text-gray-300 text-sm font-medium rounded-md hover:border-gray-500 hover:text-white transition-colors"
                  >
                    Curriculum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Platform</div>
            <h2 className="text-4xl font-bold text-white mb-3">Interactive learning system</h2>
            <p className="text-gray-400 max-w-2xl">
              Not just a store. A complete educational system with real-time feedback when your arm doesn't behave.
            </p>
          </div>

          <div className="border border-gray-800 rounded-md overflow-hidden">
            <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3 bg-gray-900/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-700" />
                <div className="w-3 h-3 rounded-full bg-gray-700" />
                <div className="w-3 h-3 rounded-full bg-gray-700" />
              </div>
              <span className="text-xs text-gray-500 font-mono">ArmLab Dashboard — Lesson 04: Calibrating Joint Angles</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-800">
              <div className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-semibold mb-1">Calibrating Joint Angles</h3>
                    <p className="text-sm text-gray-500">Fine-tune motor positions for accurate movement</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-yellow-400 text-gray-950 text-xs font-bold rounded-md hover:bg-yellow-300 transition-colors">
                      Run Test
                    </button>
                    <button className="px-3 py-1.5 border border-gray-700 text-gray-400 text-xs rounded-md hover:border-gray-500 transition-colors">
                      Wiring Guide
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-yellow-400 font-mono">65%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div className="bg-yellow-400 h-1 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Joint 1", value: "45.2°", status: "Calibrated", ok: true },
                    { label: "Joint 2", value: "92.8°", status: "Overshooting", ok: false },
                    { label: "Joint 3", value: "−15.0°", status: "Calibrated", ok: true },
                  ].map((j) => (
                    <div key={j.label} className="border border-gray-800 rounded-md p-4 bg-gray-900/40">
                      <div className="text-xs text-gray-500 mb-1">{j.label}</div>
                      <div className={`text-2xl font-bold font-mono ${j.ok ? "text-white" : "text-orange-400"}`}>
                        {j.value}
                      </div>
                      <div className={`text-xs mt-1 ${j.ok ? "text-green-400" : "text-orange-400"}`}>
                        {j.ok ? "✓ " : "⚠ "}{j.status}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border border-orange-500/20 rounded-md p-4 bg-orange-500/5 flex items-start gap-3">
                  <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <div className="text-sm font-semibold text-orange-400 mb-1">Live Feedback</div>
                    <p className="text-sm text-gray-400">
                      Joint 2 is overshooting by 8°. Try reducing speed or recalibrating the servo zero position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-800">
                <div className="p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Motor Status</h4>
                  <div className="space-y-2">
                    {["Motor 1", "Motor 2", "Motor 3", "Gripper"].map((m) => (
                      <div key={m} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{m}</span>
                        <span className="text-xs text-green-400 font-mono">● ACTIVE</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Connection</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm text-gray-300">ArmLab Starter Kit</span>
                  </div>
                  <div className="text-xs text-gray-600 font-mono">Firmware v1.2.4</div>
                </div>
                <div className="p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Errors</h4>
                  <div className="text-sm text-gray-600">No errors detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Curriculum</div>
            <h2 className="text-4xl font-bold text-white mb-3">Structured from day one</h2>
            <p className="text-gray-400">Assembly to advanced kinematics — no prior experience needed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800 rounded-md overflow-hidden">
            {[
              { title: "Assemble the Base", level: "Beginner", time: "30 min", skills: ["mechanical assembly", "part identification"] },
              { title: "Wiring the Controller", level: "Beginner", time: "40 min", skills: ["circuit basics", "motor connections"] },
              { title: "Servo and Motor Basics", level: "Beginner", time: "35 min", skills: ["PWM signals", "motor control"] },
              { title: "Joint Calibration", level: "Intermediate", time: "45 min", skills: ["zero positions", "angle limits"] },
              { title: "Forward Kinematics", level: "Intermediate", time: "60 min", skills: ["coordinate frames", "workspace mapping"] },
              { title: "Inverse Kinematics", level: "Advanced", time: "75 min", skills: ["position solving", "joint angles"] },
              { title: "Pick-and-Place Challenge", level: "Advanced", time: "90 min", skills: ["path planning", "trajectory control"] },
              { title: "Custom End-Effector", level: "Advanced", time: "120 min", skills: ["mechanical design", "integration"] },
            ].map((lesson, index) => (
              <div key={index} className="p-5 bg-gray-950 hover:bg-gray-900/60 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    lesson.level === "Beginner" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                    lesson.level === "Intermediate" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                    "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {lesson.level}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                  <Clock size={12} />
                  <span>{lesson.time}</span>
                </div>
                <div className="space-y-1">
                  {lesson.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-gray-700 rounded-full shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Feedback */}
      <section className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Feedback System</div>
            <h2 className="text-4xl font-bold text-white mb-3">Real-time guidance</h2>
            <p className="text-gray-400">Connect your arm and get instant analysis while testing.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-gray-800 rounded-md p-6 bg-gray-900/20">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Platform Features</h3>
              <div className="space-y-3">
                {[
                  "Live joint angle tracking",
                  "Motor status monitoring",
                  "Calibration warnings",
                  "Wiring mistake detection",
                  "Step-by-step troubleshooting",
                  "Task completion scoring",
                  "Experiment logs",
                  "Performance charts",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="text-yellow-400 shrink-0" size={16} />
                    <span className="text-gray-400 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-red-500/20 rounded-md p-6 bg-red-500/[0.03]">
              <div className="flex items-start gap-3 mb-5">
                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="text-sm font-semibold text-red-400 mb-0.5">Detected Issue</div>
                  <h3 className="text-white font-semibold">Gripper motor not responding</h3>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Possible causes</h4>
                <ol className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex gap-2"><span className="text-gray-600">1.</span> Loose wire on motor port 3</li>
                  <li className="flex gap-2"><span className="text-gray-600">2.</span> Incorrect pin selected in software</li>
                  <li className="flex gap-2"><span className="text-gray-600">3.</span> Motor power supply not connected</li>
                </ol>
              </div>

              <div className="border border-yellow-400/20 rounded-md p-4 bg-yellow-400/[0.03]">
                <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">Suggested Fix</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Check the wiring guide for Step 2 in the Assembly section. Verify the gripper motor is connected to port 3 on the controller board.
                </p>
                <button className="px-4 py-2 bg-yellow-400 text-gray-950 text-xs font-bold rounded-md hover:bg-yellow-300 transition-colors">
                  Open Wiring Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Community</div>
            <h2 className="text-4xl font-bold text-white mb-3">Learn together. Build together.</h2>
            <p className="text-gray-400 max-w-2xl">
              When your arm doesn't move the way you expect, the community has your back — in real time or async.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Chat */}
            <div className="border border-gray-800 rounded-md overflow-hidden">
              <div className="border-b border-gray-800 px-5 py-3 flex items-center justify-between bg-gray-900/40">
                <div className="flex items-center gap-2">
                  <MessageSquare size={15} className="text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Live Chat</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  LIVE
                </div>
              </div>
              <div className="p-5 space-y-4 bg-gray-950 min-h-[220px]">
                <div>
                  <span className="text-xs text-yellow-400 font-semibold">sarah_k</span>
                  <p className="text-sm text-gray-300 mt-0.5">My joint 2 keeps overshooting — any tips?</p>
                </div>
                <div>
                  <span className="text-xs text-yellow-400 font-semibold">rodrigo_m</span>
                  <p className="text-sm text-gray-300 mt-0.5">Try lowering your PWM speed in the config, worked for me</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-md p-3 font-mono text-xs text-gray-300">
                  arm.set_speed(joint=2, speed=0.6)
                </div>
                <div>
                  <span className="text-xs text-yellow-400 font-semibold">sarah_k</span>
                  <p className="text-sm text-gray-300 mt-0.5">That fixed it!! thank you</p>
                </div>
              </div>
              <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/40">
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                >
                  Join the conversation <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Forum */}
            <div className="border border-gray-800 rounded-md overflow-hidden">
              <div className="border-b border-gray-800 px-5 py-3 flex items-center gap-2 bg-gray-900/40">
                <HelpCircle size={15} className="text-yellow-400" />
                <span className="text-sm font-semibold text-white">Q&A Forum</span>
                <span className="text-xs text-gray-500 ml-auto">Searchable answers that stay</span>
              </div>
              <div className="divide-y divide-gray-800/50 bg-gray-950">
                {[
                  { q: "How do I calibrate zero position for all joints at once?", replies: 4, tag: "Calibration" },
                  { q: "Gripper not gripping — servo moves but no force", replies: 7, tag: "Hardware" },
                  { q: "Best Python library for smooth trajectory planning?", replies: 3, tag: "Python" },
                ].map((thread, i) => (
                  <div key={i} className="px-5 py-4 hover:bg-gray-900/40 transition-colors">
                    <p className="text-sm text-gray-200 mb-2">{thread.q}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600">{thread.replies} replies</span>
                      <span className="text-xs px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded font-medium">
                        {thread.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/40">
                <Link
                  to="/forum"
                  className="inline-flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                >
                  Browse the forum <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="schools" className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Who It's For</div>
            <h2 className="text-4xl font-bold text-white">Built for diverse learners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "University courses", desc: "Hands-on experience with kinematics, control theory, and system integration." },
              { icon: Target, title: "Capstone teams", desc: "Foundation for advanced projects with expandable modules and custom end-effectors." },
              { icon: Building2, title: "Makerspaces", desc: "Structured learning tool that complements open-ended maker projects." },
              { icon: Users, title: "Self-learners", desc: "Learn robotics at your own pace with guided lessons and real-time feedback." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-gray-800 rounded-md p-6 hover:border-yellow-400/30 transition-colors group bg-gray-900/20">
                <div className="w-10 h-10 border border-gray-800 rounded-md flex items-center justify-center mb-5 group-hover:border-yellow-400/30 transition-colors">
                  <Icon className="text-yellow-400" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Comparison</div>
            <h2 className="text-4xl font-bold text-white">Why ArmLab is different</h2>
          </div>

          <div className="border border-gray-800 rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/40">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trad. Kits</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tutorials</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-yellow-400 uppercase tracking-wider">ArmLab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[
                  { feature: "Hands-on hardware", traditional: true, tutorials: false, armlab: true },
                  { feature: "Structured learning path", traditional: false, tutorials: true, armlab: true },
                  { feature: "Real-time feedback", traditional: false, tutorials: false, armlab: true },
                  { feature: "Hardware + software integration", traditional: false, tutorials: false, armlab: true },
                  { feature: "Troubleshooting support", traditional: false, tutorials: false, armlab: true },
                  { feature: "Engineering challenges", traditional: true, tutorials: false, armlab: true },
                  { feature: "Community & peer help", traditional: false, tutorials: false, armlab: true },
                  { feature: "Expandable modules", traditional: false, tutorials: false, armlab: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-900/30 transition-colors">
                    <td className="py-3.5 px-6 text-sm text-gray-300">{row.feature}</td>
                    <td className="text-center py-3.5 px-6">
                      {row.traditional ? <Check className="inline text-gray-400" size={16} /> : <X className="inline text-gray-700" size={16} />}
                    </td>
                    <td className="text-center py-3.5 px-6">
                      {row.tutorials ? <Check className="inline text-gray-400" size={16} /> : <X className="inline text-gray-700" size={16} />}
                    </td>
                    <td className="text-center py-3.5 px-6">
                      {row.armlab ? <Check className="inline text-yellow-400" size={16} /> : <X className="inline text-gray-700" size={16} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-gray-900 py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Roadmap</div>
            <h2 className="text-4xl font-bold text-white">What's coming</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800 rounded-md overflow-hidden">
            {[
              { title: "Starter Arm Kit", status: "Available Now", current: true },
              { title: "Advanced 6-Axis Arm", status: "Q1 2027", current: false },
              { title: "Vision Module", status: "Q2 2027", current: false },
              { title: "Force Feedback Module", status: "Q3 2027", current: false },
              { title: "Custom End-Effector Pack", status: "Q4 2027", current: false },
              { title: "Classroom Dashboard", status: "Q1 2028", current: false },
              { title: "Competition Challenges", status: "Q2 2028", current: false },
              { title: "Advanced Sensors Kit", status: "Q3 2028", current: false },
            ].map((item, i) => (
              <div key={i} className={`p-5 ${item.current ? "bg-yellow-400/5" : "bg-gray-950"}`}>
                <div className="flex items-center justify-between mb-4">
                  {item.current
                    ? <Zap className="text-yellow-400" size={16} />
                    : <Calendar className="text-gray-700" size={16} />
                  }
                  <span className={`text-xs font-mono ${item.current ? "text-yellow-400" : "text-gray-600"}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className={`text-sm font-semibold ${item.current ? "text-white" : "text-gray-500"}`}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-gray-900 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-6">Get Started</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to build?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Join the early access list. We'll reach out with launch pricing and kit details when we're ready to ship.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-4 bg-yellow-400 text-gray-950 font-bold text-lg rounded-md hover:bg-yellow-300 transition-colors"
          >
            Join Early Access
          </button>
          <p className="text-sm text-gray-600 mt-4">No commitment. No spam.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
