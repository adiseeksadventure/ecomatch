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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="bg-primary-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Sustainability Profile
            </h1>
            <p className="text-xl text-gray-600">
              Based on your answers, here's your personalized sustainability
              match
            </p>
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-4">
              {results.category}
            </h2>
            <p className="text-gray-700 mb-6">{results.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Recommended Businesses
                </h3>
                <ul className="space-y-2">
                  {results.businesses.map((business, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Leaf className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{business}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/directory" className="btn-primary text-lg px-8 py-3">
              Browse Recommended Businesses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={handleRestart}
              className="btn-secondary text-lg px-8 py-3"
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sustainability Quiz
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Answer a few questions to discover businesses that match your values
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  answers[currentQ.id] === option.value
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      answers[currentQ.id] === option.value
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentQuestion === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors duration-200 ${
                hasAnswered
                  ? "btn-primary"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span>
                {currentQuestion === questions.length - 1
                  ? "See Results"
                  : "Next"}
              </span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityQuiz;
