import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import {
  Cpu,
  Wrench,
  LineChart,
  Code,
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  Sparkles,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Zap,
  Brain,
  Target,
  Award,
  Calendar,
  Clock,
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsMTYzLDE4NCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-sm text-cyan-400">Build robotics. Learn by doing.</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Robotics kits that teach real engineering.
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Assemble, code, calibrate, and control a robotic arm while learning mechanics, electronics, programming, and automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#kit"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  Explore the Kit
                  <ChevronRight size={20} />
                </a>
                <a
                  href="#guides"
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  View Learning Platform
                  <LineChart size={20} />
                </a>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <Cpu size={16} className="text-cyan-400" />
                  <span className="text-sm">4–6 Axis Arm</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <Wrench size={16} className="text-cyan-400" />
                  <span className="text-sm">Guided Assembly</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <Zap size={16} className="text-cyan-400" />
                  <span className="text-sm">Real-Time Feedback</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <Code size={16} className="text-cyan-400" />
                  <span className="text-sm">Python/Arduino</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <BookOpen size={16} className="text-cyan-400" />
                  <span className="text-sm">Guided Lessons</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                  <Brain size={16} className="text-cyan-400" />
                  <span className="text-sm">Beginner to Advanced</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyb2JvdGljJTIwYXJtJTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzc5ODU1NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Educational robotic arm"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The robotics learning gap</h2>
            <p className="text-xl text-gray-400">
              Students struggle to bridge theory and practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Too much theory, not enough building</h3>
              <p className="text-gray-400">
                Students read textbooks and watch videos but never touch real hardware or debug real systems.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expensive robotics lab equipment</h3>
              <p className="text-gray-400">
                Professional robots cost thousands and require lab space most students don't have access to.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <X className="text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">No clear feedback when things go wrong</h3>
              <p className="text-gray-400">
                Scattered tutorials and DIY kits leave students stuck without guidance when motors don't respond or joints drift.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-cyan-400 font-semibold">
              Robotic Arm Kits gives students one structured kit that combines hardware, software, and real-time feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="kit" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">ArmLab Starter Kit</h2>
            <p className="text-xl text-gray-400">
              Everything you need to build and control a robotic arm
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1637002722490-5f8ceed9774c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxyb2JvdGljJTIwYXJtJTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzc5ODU1NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Robotic arm kit components"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            <div>
              <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">What's included</h3>
                <p className="text-gray-300 mb-6">
                  A compact robotic arm kit designed for students to learn assembly, motion control, kinematics, calibration, and automation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Robotic arm structural parts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Controller board</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Servo/stepper motors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Gripper end-effector</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Wires and assembly tools</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">USB/Bluetooth module</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Sensor module</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Assembly guide</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Lesson platform access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-cyan-400 mt-1" size={20} />
                    <span className="text-gray-300">Real-time feedback dashboard</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
                    Join Early Access
                  </button>
                  <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Platform Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Interactive learning platform</h2>
            <p className="text-xl text-gray-400">
              Not just a store. A complete educational system with real-time feedback.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Lesson 04: Calibrating Joint Angles</h3>
                    <p className="text-gray-400">Learn how to fine-tune motor positions for accurate movement</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-400 transition-colors">
                      Run Test Movement
                    </button>
                    <button className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                      Open Wiring Guide
                    </button>
                  </div>
                </div>

                <div className="bg-gray-950/50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-cyan-400">65%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Joint 1</div>
                      <div className="text-2xl font-bold text-cyan-400">45.2°</div>
                      <div className="text-xs text-green-400 mt-1">✓ Calibrated</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Joint 2</div>
                      <div className="text-2xl font-bold text-orange-400">92.8°</div>
                      <div className="text-xs text-orange-400 mt-1">⚠ Overshooting</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Joint 3</div>
                      <div className="text-2xl font-bold text-cyan-400">-15.0°</div>
                      <div className="text-xs text-green-400 mt-1">✓ Calibrated</div>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-orange-400 mt-0.5" size={20} />
                      <div>
                        <div className="font-semibold text-orange-400 mb-1">Live Feedback</div>
                        <p className="text-sm text-gray-300">
                          Joint 2 is overshooting by 8°. Try reducing speed or recalibrating the servo zero position.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950/50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Motor Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Motor 1</span>
                      <span className="text-xs text-green-400">● Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Motor 2</span>
                      <span className="text-xs text-green-400">● Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Motor 3</span>
                      <span className="text-xs text-green-400">● Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Gripper</span>
                      <span className="text-xs text-green-400">● Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-950/50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Connection</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm">ArmLab Starter Kit</span>
                  </div>
                  <div className="text-xs text-gray-400">Firmware v1.2.4</div>
                </div>

                <div className="bg-gray-950/50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Recent Errors</h4>
                  <div className="text-sm text-gray-400">No errors detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Structured curriculum</h2>
            <p className="text-xl text-gray-400">
              From assembly to advanced kinematics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Assemble the Base", level: "Beginner", time: "30 min", skills: ["mechanical assembly", "part identification"] },
              { title: "Wiring the Controller", level: "Beginner", time: "40 min", skills: ["circuit basics", "motor connections"] },
              { title: "Servo and Motor Basics", level: "Beginner", time: "35 min", skills: ["PWM signals", "motor control"] },
              { title: "Joint Calibration", level: "Intermediate", time: "45 min", skills: ["zero positions", "angle limits"] },
              { title: "Forward Kinematics", level: "Intermediate", time: "60 min", skills: ["coordinate frames", "workspace mapping"] },
              { title: "Inverse Kinematics", level: "Advanced", time: "75 min", skills: ["position solving", "joint angles"] },
              { title: "Pick-and-Place Challenge", level: "Advanced", time: "90 min", skills: ["path planning", "trajectory control"] },
              { title: "Custom End-Effector Design", level: "Advanced", time: "120 min", skills: ["mechanical design", "integration"] },
            ].map((lesson, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-cyan-400">Lesson {String(index + 1).padStart(2, '0')}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {lesson.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">{lesson.title}</h3>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{lesson.time}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <div className="font-semibold mb-1">Skills:</div>
                  <div className="space-y-1">
                    {lesson.skills.map((skill, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight size={14} className="mt-0.5 text-cyan-400" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-Time Feedback Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real-time feedback system</h2>
            <p className="text-xl text-gray-400">
              Connect your arm and get instant guidance while testing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
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
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="text-cyan-400" size={20} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="text-red-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">Detected issue: Gripper motor not responding</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Possible causes:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-300">
                    <li>Loose wire on motor port 3</li>
                    <li>Incorrect pin selected in software</li>
                    <li>Motor power supply not connected</li>
                  </ol>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">Suggested fix:</h4>
                  <p className="text-gray-300 mb-3">
                    Check the wiring guide for Step 2 in the Assembly section. Verify the gripper motor is connected to port 3 on the controller board.
                  </p>
                  <button className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors">
                    Open Wiring Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="schools" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for diverse learners</h2>
            <p className="text-xl text-gray-400">
              From classrooms to makerspaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">University robotics courses</h3>
              <p className="text-gray-400 text-sm">
                Give students hands-on experience with kinematics, control theory, and system integration.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Capstone teams</h3>
              <p className="text-gray-400 text-sm">
                Use as a foundation for advanced projects with expandable modules and custom end-effectors.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Makerspaces</h3>
              <p className="text-gray-400 text-sm">
                Provide a structured learning tool that complements open-ended maker projects.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Self-learners</h3>
              <p className="text-gray-400 text-sm">
                Learn robotics at your own pace with guided lessons and real-time feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why ArmLab is different</h2>
            <p className="text-xl text-gray-400">
              More than just a kit
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold">Traditional Kits</th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold">Online Tutorials</th>
                  <th className="text-center py-4 px-6 text-cyan-400 font-semibold">Robotic Arm Kits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Structured learning path", traditional: false, tutorials: false, armlab: true },
                  { feature: "Real-time feedback", traditional: false, tutorials: false, armlab: true },
                  { feature: "Hardware + software integration", traditional: false, tutorials: false, armlab: true },
                  { feature: "Troubleshooting support", traditional: false, tutorials: false, armlab: true },
                  { feature: "Engineering challenges", traditional: true, tutorials: false, armlab: true },
                  { feature: "Expandable modules", traditional: false, tutorials: false, armlab: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                    <td className="text-center py-4 px-6">
                      {row.traditional ? <Check className="inline text-gray-500" size={20} /> : <X className="inline text-gray-600" size={20} />}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.tutorials ? <Check className="inline text-gray-500" size={20} /> : <X className="inline text-gray-600" size={20} />}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.armlab ? <Check className="inline text-cyan-400" size={20} /> : <X className="inline text-gray-600" size={20} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Future Expansion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Product roadmap</h2>
            <p className="text-xl text-gray-400">
              More modules and challenges coming soon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Starter Arm Kit", status: "Available Now", icon: Check },
              { title: "Advanced 6-Axis Arm", status: "Q3 2026", icon: Calendar },
              { title: "Vision Module", status: "Q4 2026", icon: Calendar },
              { title: "Force Feedback Module", status: "Q1 2027", icon: Calendar },
              { title: "Custom End-Effector Pack", status: "Q2 2027", icon: Calendar },
              { title: "Classroom Dashboard", status: "Q2 2027", icon: Calendar },
              { title: "Competition Challenges", status: "Q3 2027", icon: Calendar },
              { title: "Advanced Sensors Kit", status: "Q4 2027", icon: Calendar },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <item.icon className={i === 0 ? "text-cyan-400" : "text-gray-500"} size={20} />
                  <span className={`text-xs px-2 py-1 rounded ${
                    i === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start building real robotics skills.
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Designed for students, makers, and classrooms that want hands-on robotics learning without needing an expensive lab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              Join Early Access
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Request Demo
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
              View Kit Preview
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
