import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  // Example data
  const salesData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 2100 },
    { day: "Wed", sales: 800 },
    { day: "Thu", sales: 1600 },
    { day: "Fri", sales: 2000 },
    { day: "Sat", sales: 2500 },
    { day: "Sun", sales: 3000 },
  ];

  const monthlySales = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 20000 },
    { month: "May", sales: 22000 },
    { month: "Jun", sales: 17000 },
  ];

  const productSales = [
    { name: "Tires", value: 400 },
    { name: "Rims", value: 300 },
    { name: "Services", value: 300 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 shadow bg-white dark:bg-gray-800 rounded-2xl">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Daily Sales</h3>
          <p className="text-2xl font-bold text-blue-600">₱5,200</p>
        </div>
        <div className="p-4 shadow bg-white dark:bg-gray-800 rounded-2xl">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Monthly Sales</h3>
          <p className="text-2xl font-bold text-green-600">₱120,000</p>
        </div>
        <div className="p-4 shadow bg-white dark:bg-gray-800 rounded-2xl">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Yearly Sales</h3>
          <p className="text-2xl font-bold text-yellow-600">₱1,340,000</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart - Weekly Sales */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Weekly Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Monthly Sales */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Monthly Sales
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Product Breakdown */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Sales by Product
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productSales}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {productSales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
