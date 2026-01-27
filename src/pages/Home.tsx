import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Users,
  Calculator,
  MapPin,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";


const Home: React.FC = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-nature-heading" />,
      title: "Sustainability Quiz",
      description:
        "Take our interactive quiz to discover products and services that match your environmental values.",
      href: "/quiz",
    },
    {
      icon: <MapPin className="h-8 w-8 text-nature-heading" />,
      title: "Local Business Directory",
      description:
        "Find verified eco-friendly businesses and artisans in your area with detailed sustainability ratings.",
      href: "/directory",
    },
    {
      icon: <Calculator className="h-8 w-8 text-nature-heading" />,
      title: "Carbon Calculator",
      description:
        "Calculate the environmental impact of your purchases and track your carbon footprint.",
      href: "/calculator",
    },
    {
      icon: <Users className="h-8 w-8 text-nature-heading" />,
      title: "Community Dashboard",
      description:
        "Join challenges, track your impact, and connect with like-minded eco-conscious individuals.",
      href: "/dashboard",
    },
  ];

  const stats = [
    { number: "500+", label: "Businesses" },
    { number: "10k+", label: "Active Users" },
    { number: "50k+", label: "CO2 Saved (kg)" },
    { number: "95%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-nature-bg text-nature-heading font-sans">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#F9FCF8] to-nature-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-6xl md:text-8xl font-black text-nature-heading mb-8 leading-[1.05] tracking-tight">
                Small Actions, <br />
                <span className="text-nature-primary opacity-90 italic font-serif">Big Impact</span>
              </h1>
              <p className="text-lg md:text-xl text-nature-primary mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Each small action you take today sets off a wave of positive
                change for the future of our planet. Support local sustainability
                with EcoMatch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/quiz" className="btn-primary text-lg px-10 py-5 shadow-lg shadow-nature-sage/20 hover:shadow-nature-sage/40 transition-all duration-300">
                  Our Approach
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
                <Link to="/directory" className="px-10 py-5 rounded-full border-2 border-nature-primary/20 text-nature-primary font-bold hover:bg-nature-sage/10 transition-all duration-300">
                  Explore Businesses
                </Link>
              </div>
            </div>

            {/* Right Image (Floating Island) */}
            <div className="flex-1 relative">
              <div className="relative z-10 animate-float translate-y-[-10px]">
                <img 
                  src="/images/nature_hero.png" 
                  alt="Eco Floating Island" 
                  className="w-full h-auto drop-shadow-[0_25px_50px_rgba(67,104,80,0.15)] rounded-3xl"
                />
              </div>
              {/* Decorative Blur Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-nature-sage/20 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Floating Section */}
      <section className="relative z-20 -mt-10 mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl shadow-nature-sage/10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group border-r border-nature-sage/10 last:border-r-0">
                <div className="text-3xl md:text-4xl font-black text-nature-heading mb-1 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-nature-sage font-bold uppercase tracking-tighter text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-nature-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-nature-heading mb-8 tracking-tight">
              Tools for a Greener Lifestyle
            </h2>
            <p className="text-xl text-nature-primary font-medium opacity-80">
              Our platform provides all the tools you need to make eco-conscious
              decisions and support local sustainable businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="card group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-nature-accent w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-nature-sage transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-nature-heading mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-nature-primary leading-relaxed font-medium opacity-70">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact/How It Works Section */}
      <section className="py-32 bg-[#F1F5EF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-nature-sage/20 border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop" 
                    alt="Sustainable action" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-nature-accent rounded-[2rem] p-6 shadow-xl border-4 border-white hidden md:flex flex-col justify-center text-center">
                  <div className="text-4xl font-black mb-1 leading-none">50k+</div>
                  <div className="text-xs font-bold text-nature-primary uppercase">Sustainability Matches</div>
                </div>
             </div>

             <div>
                <h2 className="text-4xl md:text-6xl font-black text-nature-heading mb-12 tracking-tight">
                  Join the Movement <br />
                  in Three Simple Steps
                </h2>
                
                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl font-black text-nature-primary group-hover:bg-nature-accent transition-colors">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Take the Quiz</h3>
                      <p className="text-nature-primary font-medium opacity-70 leading-relaxed">Answer a few simple questions about your values and lifestyle habits.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl font-black text-nature-primary group-hover:bg-nature-accent transition-colors">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Get Your Match</h3>
                      <p className="text-nature-primary font-medium opacity-70 leading-relaxed">We'll connect you with local businesses and products that actually matter to you.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl font-black text-nature-primary group-hover:bg-nature-accent transition-colors">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Start Saving Impact</h3>
                      <p className="text-nature-primary font-medium opacity-70 leading-relaxed">Track your savings and see your contribution to a better environment grow over time.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nature-heading rounded-[3.5rem] p-12 lg:p-24 text-center relative overflow-hidden">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-nature-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nature-sage/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to Start Your Sustainable Journey?
              </h2>
              <p className="text-xl text-nature-sage/80 mb-12 font-medium max-w-xl mx-auto">
                Join thousands of eco-conscious consumers making a difference in their communities.
              </p>
              <Link
                to="/quiz"
                className="bg-nature-accent text-nature-heading hover:bg-white font-black py-6 px-12 rounded-full text-lg transition-all duration-300 shadow-2xl shadow-black/40 inline-flex items-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


