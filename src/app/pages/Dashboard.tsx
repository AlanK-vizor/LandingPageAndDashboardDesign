import { Navigation } from "../components/Navigation";
import { useState } from "react";
import {
  Home,
  Wrench,
  Zap,
  Settings,
  Target,
  FileText,
  HelpCircle,
  Activity,
  AlertCircle,
  ChevronRight,
  Power,
  RotateCcw,
  Hand,
  AlertTriangle,
  CheckCircle,
  Circle,
  TrendingUp,
} from "lucide-react";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [joint1, setJoint1] = useState(45);
  const [joint2, setJoint2] = useState(90);
  const [joint3, setJoint3] = useState(-15);
  const [wrist, setWrist] = useState(0);
  const [gripper, setGripper] = useState(50);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "assembly", label: "Assembly Guide", icon: Wrench },
    { id: "wiring", label: "Wiring", icon: Zap },
    { id: "calibration", label: "Calibration", icon: Settings },
    { id: "control", label: "Control Panel", icon: Target },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 fixed left-0 top-16">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {/* Top Bar */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Connected Device</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="font-semibold">ArmLab Starter Kit</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Power Status</div>
                  <div className="flex items-center gap-2">
                    <Power size={16} className="text-green-400" />
                    <span className="font-semibold text-green-400">Online</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Firmware Version</div>
                  <span className="font-semibold">v1.2.4</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                Start Test
              </button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Lesson Progress */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Lesson Progress</h3>
                <CheckCircle className="text-cyan-400" size={20} />
              </div>
              <div className="mb-3">
                <div className="text-2xl font-bold text-cyan-400 mb-1">Lesson 04</div>
                <div className="text-sm text-gray-400">Calibrating Joint Angles</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">65% Complete</span>
                <span className="text-cyan-400">13 of 20 steps</span>
              </div>
            </div>

            {/* Live Joint Angles */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Joint Angles</h3>
                <Activity className="text-cyan-400" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 1</span>
                  <span className="font-semibold text-cyan-400">45.2°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 2</span>
                  <span className="font-semibold text-orange-400">92.8°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 3</span>
                  <span className="font-semibold text-cyan-400">-15.0°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Wrist</span>
                  <span className="font-semibold text-cyan-400">0.0°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gripper</span>
                  <span className="font-semibold text-cyan-400">50%</span>
                </div>
              </div>
            </div>

            {/* Motor Health */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Motor Health</h3>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Motor 1</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Motor 2</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-xs text-orange-400">Warning</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Motor 3</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Wrist Motor</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gripper Motor</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-green-400">Healthy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calibration Status */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Calibration Status</h3>
                <Settings className="text-cyan-400" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 1</span>
                  <CheckCircle className="text-green-400" size={16} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 2</span>
                  <AlertTriangle className="text-orange-400" size={16} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Joint 3</span>
                  <CheckCircle className="text-green-400" size={16} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Wrist</span>
                  <CheckCircle className="text-green-400" size={16} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gripper</span>
                  <CheckCircle className="text-green-400" size={16} />
                </div>
              </div>
            </div>

            {/* Error Detection */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Error Detection</h3>
                <AlertCircle className="text-orange-400" size={20} />
              </div>
              <div className="space-y-3">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-orange-400 mt-0.5" size={16} />
                    <div>
                      <div className="text-sm font-semibold text-orange-400 mb-1">Joint 2 Overshooting</div>
                      <div className="text-xs text-gray-400">Detected 3 min ago</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-center py-2">
                  No other errors detected
                </div>
              </div>
            </div>

            {/* Task Score */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Task Score</h3>
                <Target className="text-cyan-400" size={20} />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">87/100</div>
                <div className="text-sm text-gray-400 mb-4">Current lesson score</div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle size={14} className="text-green-400" />
                  <span>Excellent calibration accuracy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Joint Control</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Joint 1</label>
                    <span className="text-sm font-semibold text-cyan-400">{joint1}°</span>
                  </div>
                  <input
                    type="range"
                    value={joint1}
                    onChange={(e) => setJoint1(Number(e.target.value))}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Joint 2</label>
                    <span className="text-sm font-semibold text-orange-400">{joint2}°</span>
                  </div>
                  <input
                    type="range"
                    value={joint2}
                    onChange={(e) => setJoint2(Number(e.target.value))}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Joint 3</label>
                    <span className="text-sm font-semibold text-cyan-400">{joint3}°</span>
                  </div>
                  <input
                    type="range"
                    value={joint3}
                    onChange={(e) => setJoint3(Number(e.target.value))}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Wrist</label>
                    <span className="text-sm font-semibold text-cyan-400">{wrist}°</span>
                  </div>
                  <input
                    type="range"
                    value={wrist}
                    onChange={(e) => setWrist(Number(e.target.value))}
                    min={-180}
                    max={180}
                    step={1}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Gripper</label>
                    <span className="text-sm font-semibold text-cyan-400">{gripper}%</span>
                  </div>
                  <input
                    type="range"
                    value={gripper}
                    onChange={(e) => setGripper(Number(e.target.value))}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="px-4 py-3 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                  <Home size={18} />
                  Home Position
                </button>
                <button className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <Hand size={18} />
                  Pick Object
                </button>
                <button className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw size={18} />
                  Release Object
                </button>
                <button className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg font-semibold hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 text-red-400">
                  <AlertTriangle size={18} />
                  Emergency Stop
                </button>
              </div>
            </div>

            {/* Feedback Panel */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Real-Time Feedback</h3>
              <div className="space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-orange-400 mt-0.5" size={20} />
                    <div>
                      <div className="font-semibold text-orange-400 mb-1">Calibration Warning</div>
                      <p className="text-sm text-gray-300 mb-2">
                        Joint 2 is moving slower than expected. Check servo connection or reduce payload.
                      </p>
                      <div className="text-xs text-gray-400">Detected 2 minutes ago</div>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-cyan-400 mt-0.5" size={20} />
                    <div>
                      <div className="font-semibold text-cyan-400 mb-1">Good Progress</div>
                      <p className="text-sm text-gray-300 mb-2">
                        Joints 1 and 3 are well calibrated. Continue to the next step.
                      </p>
                      <div className="text-xs text-gray-400">Updated just now</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="text-blue-400 mt-0.5" size={20} />
                    <div>
                      <div className="font-semibold text-blue-400 mb-1">Tip</div>
                      <p className="text-sm text-gray-300">
                        Use the wiring guide to verify all connections before running the next test.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Logs */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Logs</h3>
              <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm py-2 border-b border-white/5">
                <span className="text-gray-500">14:32:18</span>
                <span className="text-green-400">INFO</span>
                <span className="text-gray-300">Joint 1 calibration completed successfully</span>
              </div>
              <div className="flex items-start gap-3 text-sm py-2 border-b border-white/5">
                <span className="text-gray-500">14:31:45</span>
                <span className="text-orange-400">WARN</span>
                <span className="text-gray-300">Joint 2 overshooting target by 8 degrees</span>
              </div>
              <div className="flex items-start gap-3 text-sm py-2 border-b border-white/5">
                <span className="text-gray-500">14:30:22</span>
                <span className="text-green-400">INFO</span>
                <span className="text-gray-300">Test movement initiated</span>
              </div>
              <div className="flex items-start gap-3 text-sm py-2 border-b border-white/5">
                <span className="text-gray-500">14:29:10</span>
                <span className="text-green-400">INFO</span>
                <span className="text-gray-300">Device connected: ArmLab Starter Kit</span>
              </div>
              <div className="flex items-start gap-3 text-sm py-2">
                <span className="text-gray-500">14:28:33</span>
                <span className="text-blue-400">DEBUG</span>
                <span className="text-gray-300">Firmware version check: v1.2.4</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
