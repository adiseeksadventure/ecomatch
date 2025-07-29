import React, { useState } from "react";
import {
  Users,
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Star,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Clock,
  Leaf,
  Zap,
  ShoppingBag,
  Utensils,
} from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  participants: number;
  daysLeft: number;
  progress: number;
  reward: string;
  icon: React.ReactNode;
}

interface CommunityMember {
  id: number;
  name: string;
  avatar: string;
  impact: number;
  level: string;
  recentActivity: string;
}

const CommunityDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Zero Waste Week",
      description: "Reduce your household waste by 50% this week",
      category: "Waste Reduction",
      participants: 234,
      daysLeft: 5,
      progress: 75,
      reward: "Eco Warrior Badge",
      icon: <Leaf className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Energy Efficiency Challenge",
      description: "Cut your energy consumption by 20%",
      category: "Energy",
      participants: 156,
      daysLeft: 12,
      progress: 45,
      reward: "Energy Saver Badge",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Local Shopping Spree",
      description: "Shop at 5 local sustainable businesses",
      category: "Local Economy",
      participants: 89,
      daysLeft: 8,
      progress: 60,
      reward: "Local Hero Badge",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Plant-Based Challenge",
      description: "Try 7 days of plant-based meals",
      category: "Food",
      participants: 312,
      daysLeft: 3,
      progress: 90,
      reward: "Green Chef Badge",
      icon: <Utensils className="h-6 w-6" />,
    },
  ];

  const communityMembers: CommunityMember[] = [
    {
      id: 1,
      name: "Sarah Green",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      impact: 1250,
      level: "Eco Master",
      recentActivity: "Completed Zero Waste Week challenge",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      impact: 890,
      level: "Sustainability Champion",
      recentActivity: "Reduced energy consumption by 25%",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      impact: 2100,
      level: "Green Legend",
      recentActivity: "Planted 10 trees this month",
    },
    {
      id: 4,
      name: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      impact: 650,
      level: "Eco Enthusiast",
      recentActivity: "Started composting at home",
    },
  ];

  const userStats = {
    totalImpact: 450,
    level: "Eco Enthusiast",
    challengesCompleted: 8,
    currentStreak: 12,
    communityRank: 15,
    badges: ["Local Hero", "Energy Saver", "Waste Warrior"],
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "challenges",
      label: "Challenges",
      icon: <Target className="h-5 w-5" />,
    },
    {
      id: "community",
      label: "Community",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your impact, join challenges, and connect with like-minded
            eco-conscious individuals.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                selectedTab === tab.id
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {userStats.totalImpact}
                </div>
                <div className="text-sm text-gray-600">
                  Total Impact (lbs CO2 saved)
                </div>
              </div>

              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {userStats.level}
                </div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>

              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {userStats.challengesCompleted}
                </div>
                <div className="text-sm text-gray-600">
                  Challenges Completed
                </div>
              </div>

              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {userStats.currentStreak}
                </div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>

            {/* Recent Activity and Community */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Completed Energy Efficiency Challenge
                      </div>
                      <div className="text-sm text-gray-600">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Earned "Energy Saver" Badge
                      </div>
                      <div className="text-sm text-gray-600">3 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Joined Local Shopping Challenge
                      </div>
                      <div className="text-sm text-gray-600">5 days ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Community Members */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Community Members
                </h3>
                <div className="space-y-3">
                  {communityMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {member.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary-600">
                          {member.impact}
                        </div>
                        <div className="text-xs text-gray-500">impact</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {selectedTab === "challenges" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Active Challenges
              </h2>
              <p className="text-gray-600">
                Join challenges to earn badges and make a difference
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary-600">{challenge.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {challenge.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {challenge.daysLeft} days left
                      </div>
                      <div className="text-sm text-gray-500">
                        {challenge.participants} participants
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{challenge.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {challenge.reward}
                      </span>
                    </div>
                    <button className="btn-primary text-sm">
                      Join Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Tab */}
        {selectedTab === "community" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Community Members
              </h2>
              <p className="text-gray-600">
                Connect with eco-conscious individuals in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityMembers.map((member) => (
                <div key={member.id} className="card text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sm text-primary-600 mb-2">
                    {member.level}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {member.impact}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    lbs CO2 saved
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {member.recentActivity}
                  </p>
                  <div className="flex justify-center space-x-2">
                    <button className="btn-primary text-sm px-3 py-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </button>
                    <button className="btn-secondary text-sm px-3 py-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {selectedTab === "achievements" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Achievements
              </h2>
              <p className="text-gray-600">
                Celebrate your sustainability milestones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStats.badges.map((badge, index) => (
                <div key={index} className="card text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {badge}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Earned for completing challenges
                  </p>
                  <div className="flex justify-center">
                    <button className="btn-secondary text-sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Eco Master</div>
                    <div className="text-sm text-gray-600">
                      Complete 10 challenges
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Community Leader
                    </div>
                    <div className="text-sm text-gray-600">
                      Help 5 other members
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDashboard;
