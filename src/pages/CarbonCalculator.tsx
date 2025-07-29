import React, { useState } from "react";
import {
  Calculator,
  Leaf,
  TrendingUp,
  TrendingDown,
  Car,
  Plane,
  Train,
  Bus,
  Home,
  ShoppingBag,
  Utensils,
  Zap,
  Trees,
  Target,
  BarChart3,
} from "lucide-react";

interface CarbonEntry {
  id: number;
  category: string;
  activity: string;
  amount: number;
  unit: string;
  carbonFootprint: number;
  date: string;
}

const CarbonCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("transport");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [entries, setEntries] = useState<CarbonEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

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

  const calculateCarbonFootprint = (amount: number, factor: number): number => {
    return Math.round(amount * factor * 100) / 100;
  };

  const handleAddEntry = () => {
    if (!amount || !unit) return;

    const activity = currentCategory?.activities.find((a) => a.unit === unit);
    if (!activity) return;

    const carbonFootprint = calculateCarbonFootprint(
      parseFloat(amount),
      activity.factor
    );

    const newEntry: CarbonEntry = {
      id: Date.now(),
      category: selectedCategory,
      activity: activity.name,
      amount: parseFloat(amount),
      unit: unit,
      carbonFootprint: carbonFootprint,
      date: new Date().toISOString().split("T")[0],
    };

    setEntries((prev) => [...prev, newEntry]);
    setAmount("");
    setUnit("");
    setShowForm(false);
  };

  const handleDeleteEntry = (id: number) => {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Carbon Footprint Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily activities and calculate their environmental
            impact. Make informed decisions to reduce your carbon footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Add Activity
              </h2>

              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedCategory === category.value
                            ? "border-primary-600 bg-primary-50 text-primary-700"
                            : "border-gray-200 hover:border-primary-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <span className="text-sm font-medium">
                            {category.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select an activity</option>
                    {currentCategory?.activities.map((activity, index) => (
                      <option key={index} value={activity.unit}>
                        {activity.name} ({activity.unit})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="input-field"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleAddEntry}
                  disabled={!amount || !unit}
                  className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                    amount && unit
                      ? "btn-primary"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add to Calculator
                </button>
              </div>
            </div>
          </div>

          {/* Results and History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalCarbonFootprint.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Total CO2 (lbs)</div>
              </div>

              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {averagePerDay.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg per Day (lbs)</div>
              </div>

              <div className="card text-center">
                <div className="flex justify-center mb-2">
                  <Trees className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {treesNeeded}
                </div>
                <div className="text-sm text-gray-600">Trees to Offset</div>
              </div>
            </div>

            {/* Activity History */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activity History
              </h3>

              {entries.length === 0 ? (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No activities added yet. Start by adding your first activity
                    above.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-primary-600">
                          {getCategoryIcon(entry.category)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {entry.activity}
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.amount} {entry.unit} • {entry.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {entry.carbonFootprint} lbs CO2
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <TrendingDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tips to Reduce Your Footprint
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Use public transportation or carpool
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Switch to energy-efficient appliances
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Choose plant-based meals more often
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Buy local and seasonal produce
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Reduce, reuse, and recycle
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Support sustainable businesses
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
