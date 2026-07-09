import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Target, Users, Lightbulb, Rocket, User } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make hands-on robotics education accessible to every student and educator, regardless of prior experience.",
    },
    {
      icon: Lightbulb,
      title: "Hands-On Learning",
      description:
        "We believe the best way to understand engineering concepts is to build, wire, and program something real.",
    },
    {
      icon: Users,
      title: "Built for Classrooms",
      description:
        "Every kit and lesson is designed with teachers in mind, so it fits naturally into existing curricula.",
    },
    {
      icon: Rocket,
      title: "Always Improving",
      description:
        "We continuously refine our kits and guides based on feedback from real students and educators.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />

      <main className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <section className="mb-20">
          <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-6">About Us</div>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-6">About ArmLab</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            ArmLab was built to give students and educators a real, hands-on way to learn robotics and
            engineering — one joint, one wire, and one line of code at a time.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="border border-gray-800 rounded-md p-6 bg-gray-900/20 hover:border-yellow-400/30 transition-colors group"
              >
                <div className="w-10 h-10 border border-gray-800 rounded-md flex items-center justify-center mb-5 group-hover:border-yellow-400/30 transition-colors">
                  <Icon size={20} className="text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </section>

        <section className="mb-20">
          <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-6">Team</div>
          <h2 className="text-3xl font-bold text-white mb-10">Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Alankrit Keshari",
                role: "Co-Founder",
                bio: "Virginia Tech graduate in Robotics & Mechatronics and Mechanical Engineering. Trying to build something that makes real hands-on engineering education accessible to every student, regardless of where they are.",
              },
              {
                name: "Freeman Liu",
                role: "Co-Founder",
                bio: "Virginia Tech graduate in Mechanical Engineering. Focused on making ArmLab's hardware reliable, manufacturable, and something students actually enjoy building.",
              },
            ].map((founder) => (
              <div key={founder.name} className="border border-gray-800 rounded-md p-6 bg-gray-900/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/20 rounded-md flex items-center justify-center shrink-0">
                    <User size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">{founder.name}</h3>
                    <p className="text-gray-500 text-sm">{founder.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-gray-800 rounded-md p-10 bg-gray-900/20">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to bring ArmLab to your classroom?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl text-sm leading-relaxed">
            We're happy to talk through pricing, curriculum fit, and getting your first kits in students' hands.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-yellow-400 text-gray-950 font-bold px-6 py-3 rounded-md hover:bg-yellow-300 transition-colors text-sm"
          >
            Get in Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
