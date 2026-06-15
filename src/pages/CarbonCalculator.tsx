import React, { useState, useEffect } from "react";
import {
  Calculator,
  Leaf,
  TrendingDown,
  Car,
  ShoppingBag,
  Utensils,
  Zap,
  Trees,
  Target,
  BarChart3,
} from "lucide-react";

interface CarbonEntry {
  id: string;
  category: string;
  activity: string;
  amount: number;
  unit: string;
  carbonFootprint: number;
  date: string;
}

const STORAGE_KEY = "ecomatch_carbon_entries";

const loadEntries = (): CarbonEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CarbonEntry[]) : [];
  } catch {
    return [];
  }
};

const today = () => new Date().toISOString().split("T")[0];

const makeId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const CarbonCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("transport");
  const [activityName, setActivityName] = useState("");
  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState<CarbonEntry[]>(loadEntries);

  // Persist entries locally so the calculator works without an account.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const categories = [
    {
      value: "transport",
      label: "Transportation",
      icon: <Car className="h-5 w-5" />,
      activities: [
        { name: "Car (gasoline)", unit: "miles", factor: 0.404 },
        { name: "Car (electric)", unit: "miles", factor: 0.1 },
        { name: "Bus", unit: "miles", factor: 0.14 },
        { name: "Train", unit: "miles", factor: 0.14 },
        { name: "Plane (domestic)", unit: "miles", factor: 0.255 },
        { name: "Plane (international)", unit: "miles", factor: 0.139 },
      ],
    },
    {
      value: "energy",
      label: "Energy",
      icon: <Zap className="h-5 w-5" />,
      activities: [
        { name: "Electricity (grid)", unit: "kWh", factor: 0.92 },
        { name: "Natural Gas", unit: "therms", factor: 5.3 },
        { name: "Heating Oil", unit: "gallons", factor: 22.61 },
        { name: "Propane", unit: "gallons", factor: 12.43 },
      ],
    },
    {
      value: "food",
      label: "Food & Dining",
      icon: <Utensils className="h-5 w-5" />,
      activities: [
        { name: "Beef", unit: "pounds", factor: 13.3 },
        { name: "Pork", unit: "pounds", factor: 7.2 },
        { name: "Chicken", unit: "pounds", factor: 2.9 },
        { name: "Fish", unit: "pounds", factor: 3.9 },
        { name: "Dairy", unit: "pounds", factor: 2.4 },
        { name: "Vegetables", unit: "pounds", factor: 0.4 },
      ],
    },
    {
      value: "shopping",
      label: "Shopping",
      icon: <ShoppingBag className="h-5 w-5" />,
      activities: [
        { name: "Clothing", unit: "items", factor: 23.2 },
        { name: "Electronics", unit: "items", factor: 45.0 },
        { name: "Furniture", unit: "items", factor: 110.0 },
        { name: "Books", unit: "items", factor: 2.9 },
      ],
    },
  ];

  const currentCategory = categories.find(
    (cat) => cat.value === selectedCategory
  );
  const selectedActivity = currentCategory?.activities.find(
    (a) => a.name === activityName
  );
  const unit = selectedActivity?.unit ?? "";

  const calculateCarbonFootprint = (amount: number, factor: number): number => {
    return Math.round(amount * factor * 100) / 100;
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setActivityName("");
    setAmount("");
  };

  const handleAddEntry = () => {
    if (!amount || !selectedActivity) return;

    const carbonFootprint = calculateCarbonFootprint(
      parseFloat(amount),
      selectedActivity.factor
    );

    const newEntry: CarbonEntry = {
      id: makeId(),
      category: selectedCategory,
      activity: selectedActivity.name,
      amount: parseFloat(amount),
      unit: selectedActivity.unit,
      carbonFootprint,
      date: today(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setAmount("");
    setActivityName("");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const totalCarbonFootprint = entries.reduce(
    (sum, entry) => sum + entry.carbonFootprint,
    0
  );
  const averagePerDay =
    entries.length > 0 ? totalCarbonFootprint / entries.length : 0;

  // Calculate trees needed to offset (1 tree absorbs ~48 lbs CO2 per year)
  const treesNeeded = Math.ceil(totalCarbonFootprint / (48 / 365));

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || <Leaf className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-nature-bg py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="p-5 rounded-[2rem] bg-nature-accent shadow-xl shadow-nature-sage/10 border-4 border-white">
              <Calculator className="h-10 w-10 text-nature-heading" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-6 tracking-tight">
            Impact Calculator
          </h1>
          <p className="text-xl text-nature-primary max-w-2xl mx-auto font-medium opacity-80">
            Measure your daily choices and discover their environmental 
            footprint. Small adjustments lead to systemic change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calculator Form */}
          <div className="lg:col-span-1">
            <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 border-nature-sage/20 sticky top-24">
              <h2 className="text-2xl font-black text-nature-heading mb-8 flex items-center gap-3">
                <Target className="h-6 w-6 text-nature-primary" />
                Add Activity
              </h2>

              <div className="space-y-8">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-black text-nature-sage uppercase tracking-[0.2em] mb-4">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryChange(category.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative group ${
                          selectedCategory === category.value
                            ? "border-nature-primary bg-white shadow-lg"
                            : "border-nature-sage/10 bg-nature-accent/20 hover:border-nature-primary/30"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                           <div className={`transition-colors ${selectedCategory === category.value ? "text-nature-primary" : "text-nature-sage"}`}>
                              {category.icon}
                           </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${selectedCategory === category.value ? "text-nature-heading" : "text-nature-primary opacity-60"}`}>
                            {category.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Selection */}
                <div>
                  <label className="block text-xs font-black text-nature-sage uppercase tracking-[0.2em] mb-4">
                    Specific Activity
                  </label>
                  <div className="relative">
                    <select
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        className="input-field pl-5 pr-12 appearance-none"
                    >
                        <option value="" className="bg-white">Select activity...</option>
                        {currentCategory?.activities.map((activity) => (
                        <option key={activity.name} value={activity.name} className="bg-white">
                            {activity.name}
                        </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-nature-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-black text-nature-sage uppercase tracking-[0.2em] mb-4">
                    Quantity ({unit || "..."})
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="input-field pl-5"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleAddEntry}
                  disabled={!amount || !activityName}
                  className={`w-full py-5 px-6 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-xl ${
                    amount && activityName
                      ? "btn-primary hover:scale-[1.02]"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200 grayscale"
                  }`}
                >
                  Log Impact
                </button>
              </div>
            </div>
          </div>

          {/* Results and History */}
          <div className="lg:col-span-2 space-y-12">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[2rem] p-8 border border-nature-sage/10 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-nature-accent/50 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                     <BarChart3 className="h-8 w-8 text-nature-heading" />
                  </div>
                </div>
                <div className="text-4xl font-black text-nature-heading mb-2">
                  {totalCarbonFootprint.toFixed(1)}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-[0.2em]">Total CO2 (lbs)</div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-nature-sage/10 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-[#F1F5EF] rounded-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                      <Zap className="h-8 w-8 text-nature-primary" />
                   </div>
                </div>
                <div className="text-4xl font-black text-nature-heading mb-2">
                  {averagePerDay.toFixed(1)}
                </div>
                <div className="text-[10px] text-nature-sage uppercase font-black tracking-[0.2em]">Daily Avg (lbs)</div>
              </div>

              <div className="bg-nature-heading rounded-[2rem] p-8 text-center relative overflow-hidden group hover:shadow-2xl hover:shadow-nature-primary/20 transition-all duration-500">
                <div className="absolute inset-0 bg-nature-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-center mb-6 relative z-10">
                   <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                      <Trees className="h-8 w-8 text-nature-accent" />
                   </div>
                </div>
                <div className="text-4xl font-black text-white mb-2 relative z-10">
                  {treesNeeded}
                </div>
                <div className="text-[10px] text-nature-sage font-black uppercase tracking-[0.2em] relative z-10">Trees Needed</div>
              </div>
            </div>

            {/* Activity History */}
            <div className="card shadow-2xl shadow-nature-sage/10 rounded-[2.5rem] p-10 border-nature-sage/20">
              <div className="mb-10">
                <h3 className="text-2xl font-black text-nature-heading flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-nature-primary" />
                  Impact History
                </h3>
                <p className="text-[10px] text-nature-sage font-black uppercase tracking-[0.2em] mt-2 ml-9">
                  Saved on this device
                </p>
              </div>

              {entries.length === 0 ? (
                <div className="text-center py-20 bg-nature-accent/20 rounded-[2rem] border-2 border-dashed border-nature-sage/10">
                  <div className="bg-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Calculator className="h-10 w-10 text-nature-sage opacity-40" />
                  </div>
                  <p className="text-nature-primary font-bold opacity-60">
                    Your journey hasn't started yet. <br />
                    Add your first activity to see your impact.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-nature-sage/5 hover:border-nature-primary/20 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 rounded-2xl bg-nature-accent/30 flex items-center justify-center text-nature-heading group-hover:scale-110 transition-transform">
                          {getCategoryIcon(entry.category)}
                        </div>
                        <div>
                          <div className="font-black text-nature-heading text-lg">
                            {entry.activity}
                          </div>
                          <div className="text-xs text-nature-primary font-bold opacity-60 uppercase tracking-widest mt-1">
                            {entry.amount} {entry.unit} • {entry.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <div className="text-right">
                          <div className="font-black text-nature-primary text-xl">
                            {entry.carbonFootprint} <span className="text-[10px] uppercase tracking-tighter opacity-60">lbs CO2</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="w-10 h-10 flex items-center justify-center text-nature-sage hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                          title="Delete Entry"
                        >
                          <TrendingDown className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-[3rem] p-12 border border-nature-sage/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-nature-accent/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />
              <h3 className="text-2xl font-black text-nature-heading mb-10 relative z-10 flex items-center gap-3">
                <Target className="h-6 w-6 text-nature-primary" />
                Paths to Reduction
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {[
                  "Use public transit or carpool to slice transit emissions",
                  "Switch to LED lighting for instant energy savings",
                  "Embrace plant-forward meals to lower food footprint",
                  "Savor local, seasonal produce to end long-haul shipping",
                  "Curate your lifestyle with durable, timeless goods",
                  "Vote with your wallet for verified green partners"
                ].map((tip, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-nature-primary" />
                    <span className="text-nature-primary font-medium opacity-80 leading-relaxed text-sm">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
