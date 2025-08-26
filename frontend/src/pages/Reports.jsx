import { useProducts } from "../context/ProductsContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

export default function Reports() {
  const { history } = useProducts();

  // Filter only today’s transactions
  const today = new Date().toLocaleDateString(); // e.g., "8/27/2025"
  const todaysTransactions = history.filter(tx => tx.date.split(",")[0] === today);

  // Summary
  const totalSales = todaysTransactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalTransactions = todaysTransactions.length;
  const avgTransaction = totalTransactions ? (totalSales / totalTransactions).toFixed(2) : 0;

  // Line chart (sales trend by time today)
  const salesByTime = todaysTransactions.map(tx => ({
    time: tx.date.split(",")[1].trim(), // keep the time part
    sales: tx.total,
  }));

  // Top products
  const productSales = {};
  todaysTransactions.forEach(tx => tx.items.forEach(item => {
    productSales[item.name] = (productSales[item.name] || 0) + item.price;
  }));
  const topProducts = Object.entries(productSales)
    .map(([name, total]) => ({ name, total }))
    .sort((a,b) => b.total - a.total)
    .slice(0,5);

  // Sales by category (pie chart)
  const categorySales = {};
  todaysTransactions.forEach(tx => tx.items.forEach(item => {
    const cat = item.category_id || "Other";
    categorySales[cat] = (categorySales[cat] || 0) + item.price;
  }));
  const pieData = Object.entries(categorySales).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Today's Sales Reports</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500">Total Sales</p>
          <h3 className="text-xl font-bold">₱{totalSales}</h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500">Transactions</p>
          <h3 className="text-xl font-bold">{totalTransactions}</h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500">Avg per Transaction</p>
          <h3 className="text-xl font-bold">₱{avgTransaction}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Sales Timeline</h3>
          {salesByTime.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesByTime}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No sales today.</p>}
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Top Products</h3>
          {topProducts.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No products sold today.</p>}
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Sales by Category</h3>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No sales today.</p>}
        </div>
      </div>
    </div>
  );
}
