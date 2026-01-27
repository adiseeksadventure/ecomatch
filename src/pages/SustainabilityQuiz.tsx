import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Leaf,
  Users,
  ShoppingBag,
  Home,
  Car,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

interface QuizResult {
  category: string;
  description: string;
  recommendations: string[];
  businesses: string[];
}

const SustainabilityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "What's your primary motivation for sustainable living?",
      options: [
        {
          value: "environmental",
          label: "Environmental Impact",
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: "health",
          label: "Personal Health",
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: "community",
          label: "Local Community",
          icon: <Home className="h-6 w-6" />,
        },
        {
          value: "cost",
          label: "Cost Savings",
          icon: <ShoppingBag className="h-6 w-6" />,
        },
      ],
    },
    {
      id: 2,
      question: "How do you typically get around?",
      options: [
        {
          value: "walking",
          label: "Walking/Biking",
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: "public",
          label: "Public Transit",
          icon: <Car className="h-6 w-6" />,
        },
        {
          value: "electric",
          label: "Electric Vehicle",
          icon: <Car className="h-6 w-6" />,
        },
        {
          value: "traditional",
          label: "Traditional Car",
          icon: <Car className="h-6 w-6" />,
        },
      ],
    },
    {
      id: 3,
      question: "What's most important to you when shopping?",
      options: [
        {
          value: "organic",
          label: "Organic Products",
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: "local",
          label: "Local Sourcing",
          icon: <Home className="h-6 w-6" />,
        },
        {
          value: "fair_trade",
          label: "Fair Trade",
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: "minimal_waste",
          label: "Minimal Packaging",
          icon: <ShoppingBag className="h-6 w-6" />,
        },
      ],
    },
    {
      id: 4,
      question: "What's your current sustainability level?",
      options: [
        {
          value: "beginner",
          label: "Just Getting Started",
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: "intermediate",
          label: "Some Sustainable Habits",
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: "advanced",
          label: "Very Eco-Conscious",
          icon: <Home className="h-6 w-6" />,
        },
        {
          value: "expert",
          label: "Sustainability Expert",
          icon: <ShoppingBag className="h-6 w-6" />,
        },
      ],
    },
    {
      id: 5,
      question: "What area would you like to focus on first?",
      options: [
        {
          value: "food",
          label: "Food & Dining",
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: "fashion",
          label: "Fashion & Beauty",
          icon: <ShoppingBag className="h-6 w-6" />,
        },
        {
          value: "home",
          label: "Home & Garden",
          icon: <Home className="h-6 w-6" />,
        },
        {
          value: "services",
          label: "Services & Utilities",
          icon: <Users className="h-6 w-6" />,
        },
      ],
    },
  ];

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = (): QuizResult => {
    const answerValues = Object.values(answers);

    // Simple scoring system
    const environmentalScore = answerValues.filter(
      (v) => v === "environmental" || v === "organic" || v === "walking"
    ).length;
    const localScore = answerValues.filter(
      (v) => v === "local" || v === "community"
    ).length;
    const healthScore = answerValues.filter((v) => v === "health").length;
    const costScore = answerValues.filter((v) => v === "cost").length;

    if (environmentalScore >= 2) {
      return {
        category: "Environmental Champion",
        description:
          "You prioritize environmental impact and are committed to reducing your carbon footprint. Focus on organic, eco-friendly products and sustainable practices.",
        recommendations: [
          "Shop at certified organic stores",
          "Choose products with minimal packaging",
          "Support businesses with strong environmental policies",
          "Consider renewable energy options",
        ],
        businesses: [
          "Green Grocers",
          "Eco Home Store",
          "Sustainable Fashion Co",
          "Green Energy Solutions",
        ],
      };
    } else if (localScore >= 2) {
      return {
        category: "Community Supporter",
        description:
          "You value local connections and want to support your community. Focus on locally-sourced products and community-based businesses.",
        recommendations: [
          "Shop at local farmers markets",
          "Support small local businesses",
          "Join community sustainability groups",
          "Attend local eco-events",
        ],
        businesses: [
          "Local Farmers Market",
          "Community Co-op",
          "Neighborhood Crafts",
          "Local Artisan Shop",
        ],
      };
    } else if (healthScore >= 2) {
      return {
        category: "Health-Conscious Consumer",
        description:
          "You prioritize personal health and wellness through sustainable choices. Focus on organic, natural, and health-promoting products.",
        recommendations: [
          "Choose organic and natural products",
          "Support wellness-focused businesses",
          "Look for health certifications",
          "Consider holistic health services",
        ],
        businesses: [
          "Organic Wellness",
          "Natural Health Store",
          "Holistic Healing Center",
          "Clean Beauty Shop",
        ],
      };
    } else {
      return {
        category: "Smart Saver",
        description:
          "You're interested in sustainable living that also saves money. Focus on cost-effective sustainable options and long-term investments.",
        recommendations: [
          "Look for bulk purchase options",
          "Consider long-lasting products",
          "Explore energy-efficient solutions",
          "Join community sharing programs",
        ],
        businesses: [
          "Bulk Food Co-op",
          "Energy Efficient Solutions",
          "Thrift & Reuse Store",
          "Community Tool Library",
        ],
      };
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const results = calculateResults();
      setResults(results);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-nature-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-nature-accent p-4 rounded-3xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-nature-sage/20 border-4 border-white">
              <CheckCircle className="h-10 w-10 text-nature-heading" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-4 tracking-tight">
              Your Eco Profile
            </h1>
            <p className="text-xl text-nature-primary font-medium opacity-80">
              Based on your answers, here's your personalized sustainability match
            </p>
          </div>

          <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] mb-12 p-10 md:p-16 border-nature-sage/20">
            <h2 className="text-4xl md:text-5xl font-black text-nature-heading mb-6 tracking-tight">
              {results.category}
            </h2>
            <p className="text-nature-primary mb-12 leading-relaxed text-xl font-medium opacity-80">{results.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-nature-heading mb-6 flex items-center gap-2">
                  Recommendations
                </h3>
                <ul className="space-y-4">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-nature-sage/10 shadow-sm">
                      <div className="mt-1 bg-nature-accent/30 p-1 rounded-md">
                        <CheckCircle className="h-4 w-4 text-nature-primary" />
                      </div>
                      <span className="text-nature-primary font-semibold">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-nature-heading mb-6 flex items-center gap-2">
                  Top Matches
                </h3>
                <ul className="space-y-4">
                  {results.businesses.map((business, index) => (
                    <li key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-nature-accent/10 border border-nature-accent/20">
                      <div className="mt-1 bg-nature-accent p-1 rounded-md">
                        <Leaf className="h-4 w-4 text-nature-heading" />
                      </div>
                      <span className="text-nature-heading font-black">{business}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/directory" className="btn-primary text-xl px-12 py-5 shadow-xl shadow-nature-sage/30">
              Explore Businesses
              <ArrowRight className="ml-2 h-6 w-6 inline" />
            </Link>
            <button
              onClick={handleRestart}
              className="px-12 py-5 rounded-full border-2 border-nature-primary/20 text-nature-primary font-black hover:bg-nature-sage/5 transition-all duration-300"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasAnswered = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-nature-bg py-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-6 tracking-tight">
            Sustainability Quiz
          </h1>
          <p className="text-xl text-nature-primary font-medium opacity-70 mb-12">
            Let's find the best eco-conscious matches for your lifestyle
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto w-full bg-white rounded-full h-4 mb-4 border border-nature-sage/20 p-1">
            <div
              className="bg-nature-primary h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-nature-primary/20"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <p className="text-nature-sage font-black tracking-widest text-xs uppercase">
            Progress: {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        <div className="card shadow-2xl shadow-nature-sage/10 rounded-[3rem] p-8 md:p-14 border-nature-sage/20 relative overflow-hidden bg-white/40 backdrop-blur-2xl">
           {/* Decorative background accent */}
           <div className="absolute -top-10 -right-10 w-48 h-48 bg-nature-accent/20 rounded-full blur-3xl pointer-events-none" />
           <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-nature-sage/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-black text-nature-heading mb-12 text-center relative z-10 leading-tight">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className={`p-8 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                  answers[currentQ.id] === option.value
                    ? "border-nature-primary bg-white shadow-xl shadow-nature-sage/20 scale-[1.02]"
                    : "border-nature-sage/10 bg-white/50 hover:bg-white hover:border-nature-sage/30"
                }`}
              >
                <div className="flex items-center space-x-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      answers[currentQ.id] === option.value
                        ? "bg-nature-primary text-white scale-110 rotate-3"
                        : "bg-nature-accent/30 text-nature-primary group-hover:scale-110"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <span className={`text-xl font-bold tracking-tight ${
                      answers[currentQ.id] === option.value ? "text-nature-heading" : "text-nature-primary opacity-80"
                  }`}>
                      {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-16 relative z-10 font-sans">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-3 text-lg font-black transition-all duration-300 py-4 px-8 rounded-full ${
                currentQuestion === 0
                  ? "opacity-0 pointer-events-none"
                  : "text-nature-sage hover:text-nature-heading hover:bg-nature-sage/10"
              }`}
            >
              <ArrowLeft className="h-6 w-6" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`flex items-center space-x-3 px-10 py-5 rounded-full transition-all duration-500 font-black shadow-xl ${
                hasAnswered
                  ? "btn-primary active:scale-95"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed grayscale"
              }`}
            >
              <span className="text-lg">
                {currentQuestion === questions.length - 1
                  ? "Discover Impact"
                  : "Continue"}
              </span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityQuiz;
