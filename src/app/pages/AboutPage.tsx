import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Target, Users, Lightbulb, Rocket } from "lucide-react";

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

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
            About Robotic Arm Kits
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Robotic Arm Kits was built to give students and educators a real,
            hands-on way to learn robotics and engineering, one joint, one
            wire, and one line of code at a time.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            );
          })}
        </section>

        <section className="text-center bg-gray-900/50 border border-gray-800/50 rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Want to bring Robotic Arm Kits to your classroom?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            We're happy to talk through pricing, curriculum fit, and getting
            your first kits in students' hands.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
