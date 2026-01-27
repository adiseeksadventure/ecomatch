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

  /* Update data icons for dark theme */
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
      icon: <Leaf className="h-6 w-6 text-green-400" />,
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
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
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
      icon: <ShoppingBag className="h-6 w-6 text-pink-400" />,
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
      icon: <Utensils className="h-6 w-6 text-orange-400" />,
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
    <div className="min-h-screen bg-nature-bg py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="p-5 rounded-[2rem] bg-nature-accent shadow-xl shadow-nature-sage/10 border-4 border-white">
               <Users className="h-10 w-10 text-nature-heading" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-6 tracking-tight">
            The Eco Commons
          </h1>
          <p className="text-xl text-nature-primary max-w-2xl mx-auto font-medium opacity-80">
            Connect with a community dedicated to a regenerative future. 
            Track shared impact and celebrate collective milestones.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-16 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full transition-all duration-500 font-black text-xs uppercase tracking-widest ${
                selectedTab === tab.id
                  ? "bg-nature-heading text-white shadow-2xl shadow-nature-heading/20 scale-[1.05]"
                  : "bg-white text-nature-sage hover:bg-nature-accent/30 border border-nature-sage/10"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-12">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-[2rem] p-8 border border-nature-sage/10 text-center group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-nature-accent/50 rounded-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-nature-heading" />
                  </div>
                </div>
                <div className="text-4xl font-black text-nature-heading mb-2">
                  {userStats.totalImpact}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-widest">
                  Total Impact (lbs)
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-nature-sage/10 text-center group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#F1F5EF] rounded-2xl group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8 text-nature-primary" />
                  </div>
                </div>
                <div className="text-xl font-black text-nature-heading mb-2">
                  {userStats.level}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-widest">Current Rank</div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-nature-sage/10 text-center group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-nature-accent/30 rounded-2xl group-hover:scale-110 transition-transform">
                     <Target className="h-8 w-8 text-nature-heading" />
                   </div>
                </div>
                <div className="text-4xl font-black text-nature-heading mb-2">
                  {userStats.challengesCompleted}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-widest">
                  Victory
                </div>
              </div>

              <div className="bg-nature-heading rounded-[2rem] p-8 text-center group hover:shadow-2xl hover:shadow-nature-heading/20 transition-all duration-500">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                     <Calendar className="h-8 w-8 text-nature-accent" />
                   </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">
                  {userStats.currentStreak}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-widest">Sun Streak</div>
              </div>
            </div>

            {/* Recent Activity and Community */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Recent Activity */}
              <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 border-nature-sage/20">
                <h3 className="text-2xl font-black text-nature-heading mb-8">
                  Pulse
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: <CheckCircle className="text-nature-primary" />, title: "Energy Victory", desc: "Energy Efficiency", time: "2d" },
                    { icon: <Star className="text-yellow-500" />, title: "Level Up", desc: "Eco Champion Earned", time: "3d" },
                    { icon: <Users className="text-nature-sage" />, title: "Joined Circle", desc: "Local Shopping Circle", time: "5d" }
                  ].map((act, i) => (
                    <div key={i} className="flex items-center space-x-6 p-5 bg-white rounded-3xl border border-nature-sage/5 hover:border-nature-primary/20 transition-all duration-300">
                      <div className="bg-nature-accent/30 p-3 rounded-2xl">
                         {act.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-nature-heading">
                          {act.title}
                        </div>
                        <div className="text-xs text-nature-primary font-bold opacity-60 uppercase tracking-widest">{act.desc}</div>
                      </div>
                      <div className="text-xs font-black text-nature-sage opacity-40">{act.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Community Members */}
              <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 border-nature-sage/20">
                <h3 className="text-2xl font-black text-nature-heading mb-8">
                  Community Leaders
                </h3>
                <div className="space-y-6">
                  {communityMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-6 p-5 bg-white rounded-3xl border border-nature-sage/5 hover:border-nature-primary/20 transition-all duration-300 group"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-nature-accent/30 group-hover:ring-nature-primary/30 transition-all duration-500"
                      />
                      <div className="flex-1">
                        <div className="font-black text-nature-heading">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-nature-primary font-black uppercase tracking-widest opacity-60">
                          {member.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-nature-primary text-xl">
                          {member.impact}
                        </div>
                        <div className="text-[10px] text-nature-sage uppercase font-black">Impact</div>
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
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-nature-heading mb-4 tracking-tight">
                Active Circles
              </h2>
              <p className="text-xl text-nature-primary font-medium opacity-60">
                Collaborate with the community to amplify your impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 border-nature-sage/20 hover:shadow-nature-primary/5 transition-all duration-500 group">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-5">
                      <div className="w-16 h-16 bg-nature-accent/30 rounded-[1.5rem] flex items-center justify-center text-nature-heading group-hover:scale-110 transition-transform">
                        {challenge.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-nature-heading leading-tight">
                          {challenge.title}
                        </h3>
                        <span className="text-[10px] font-black text-nature-primary uppercase tracking-[0.2em] opacity-60">
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-nature-heading">
                        {challenge.daysLeft}d left
                      </div>
                      <div className="text-[10px] font-bold text-nature-sage uppercase mt-1">
                        {challenge.participants} in
                      </div>
                    </div>
                  </div>

                  <p className="text-nature-primary font-medium opacity-70 mb-8 leading-relaxed italic">"{challenge.description}"</p>

                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-nature-sage mb-3">
                      <span>Journey Progress</span>
                      <span className="text-nature-heading">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-nature-accent/20 rounded-full h-3 p-0.5">
                      <div
                        className="bg-nature-primary h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-nature-primary/10"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3 bg-nature-accent/30 px-5 py-2.5 rounded-full border border-nature-accent/50">
                      <Trophy className="h-4 w-4 text-nature-heading opacity-60" />
                      <span className="text-[10px] font-black text-nature-heading uppercase tracking-widest">
                        {challenge.reward}
                      </span>
                    </div>
                    <button className="btn-primary py-3 px-8 text-[10px] font-black uppercase tracking-widest shadow-none">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Tab */}
        {selectedTab === "community" && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-nature-heading mb-4 tracking-tight">
                Circle Members
              </h2>
              <p className="text-xl text-nature-primary font-medium opacity-60">
                Connect with the people shaping our future
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {communityMembers.map((member) => (
                <div key={member.id} className="group bg-white rounded-[3rem] border border-nature-sage/10 p-10 text-center hover:shadow-2xl transition-all duration-500">
                  <div className="relative inline-block mb-8">
                     <div className="absolute inset-0 bg-nature-primary/10 rounded-[2rem] scale-150 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"></div>
                     <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-24 h-24 rounded-[2rem] relative z-10 object-cover ring-8 ring-nature-accent/30 group-hover:ring-nature-primary/20 transition-all duration-500"
                      />
                  </div>
                  
                  <h3 className="text-2xl font-black text-nature-heading mb-2">
                    {member.name}
                  </h3>
                  <div className="text-[10px] font-black text-nature-primary uppercase tracking-[0.2em] opacity-60 mb-6">
                    {member.level}
                  </div>
                  <div className="text-4xl font-black text-nature-heading mb-2">
                    {member.impact}
                  </div>
                  <div className="text-[10px] text-nature-sage font-black uppercase tracking-[0.2em] mb-8">
                    lbs CO2 saved
                  </div>
                  <p className="text-sm text-nature-primary font-medium italic mb-10 opacity-70 border-l-4 border-nature-accent/50 pl-4 text-left">
                    {member.recentActivity}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="flex-1 bg-nature-heading text-white font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-2xl hover:bg-black transition-colors">
                      Message
                    </button>
                    <button className="flex-1 border-2 border-nature-sage/20 text-nature-heading font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-2xl hover:bg-nature-accent/20 transition-colors">
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
          <div className="space-y-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-nature-heading mb-4 tracking-tight">
                Collective Honors
              </h2>
              <p className="text-xl text-nature-primary font-medium opacity-60">
                Celebrating your contributions to the commons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {userStats.badges.map((badge, index) => (
                <div key={index} className="bg-white rounded-[2.5rem] border border-nature-sage/10 p-10 text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="bg-nature-accent/30 w-24 h-24 rounded-[2rem] mx-auto mb-8 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-nature-sage/5 border-2 border-white">
                    <Award className="h-10 w-10 text-nature-heading" />
                  </div>
                  <h3 className="text-2xl font-black text-nature-heading mb-3">
                    {badge}
                  </h3>
                  <p className="text-xs text-nature-primary font-bold opacity-60 uppercase tracking-widest mb-8">
                    Legacy Achievement
                  </p>
                  <div className="flex justify-center">
                    <button className="text-[10px] font-black text-nature-sage uppercase tracking-widest hover:text-nature-primary flex items-center transition-colors">
                      <Share2 className="h-4 w-4 mr-2" />
                      Broadcast
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Achievements */}
            <div className="card shadow-2xl shadow-nature-sage/10 rounded-[3rem] p-12 border-nature-sage/20">
              <h3 className="text-2xl font-black text-nature-heading mb-10 flex items-center gap-3">
                <Clock className="h-6 w-6 text-nature-primary" />
                Horizon Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <Clock className="text-nature-primary" />, title: "Eco Architect", goal: "Finish 10 Circles" },
                  { icon: <Users className="text-nature-heading" />, title: "Circle Guardian", goal: "Mentor 5 Members" }
                ].map((up, i) => (
                  <div key={i} className="flex items-center space-x-6 p-6 bg-white rounded-[2rem] border border-nature-sage/5 hover:border-nature-primary/20 transition-all duration-300">
                    <div className="p-4 bg-nature-accent/30 rounded-2xl">
                        {up.icon}
                    </div>
                    <div>
                      <div className="font-black text-nature-heading text-xl">{up.title}</div>
                      <div className="text-[10px] text-nature-primary font-black uppercase tracking-widest opacity-60 mt-1">
                        {up.goal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDashboard;
