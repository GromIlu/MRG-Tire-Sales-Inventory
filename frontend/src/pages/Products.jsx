import { useState } from "react";
import { Search, Package, Car, Bike, Truck, AlertCircle, Check } from "lucide-react";

// Mock data - replace with actual API data
const mockProducts = [
  { id: 1, category_id: 1, name: "Michelin Pilot Sport 4", brand: "Michelin", compatibility: "car", price: 8500.0, stock: 24 },
  { id: 2, category_id: 2, name: "IRC Road Winner", brand: "IRC", compatibility: "motorcycle", price: 3200.0, stock: 12 },
  { id: 3, category_id: 1, name: "Bridgestone Potenza RE003", brand: "Bridgestone", compatibility: "car", price: 7800.0, stock: 8 },
  { id: 4, category_id: 3, name: "Dunlop K180", brand: "Dunlop", compatibility: "tricycle", price: 2800.0, stock: 0 },
  { id: 5, category_id: 2, name: "Pirelli Angel GT", brand: "Pirelli", compatibility: "motorcycle", price: 4500.0, stock: 15 },
  { id: 6, category_id: 4, name: "Goodyear Wrangler", brand: "Goodyear", compatibility: "truck", price: 12000.0, stock: 6 },
  { id: 7, category_id: 1, name: "Continental PremiumContact", brand: "Continental", compatibility: "car", price: 6900.0, stock: 18 },
  { id: 8, category_id: 2, name: "Maxxis Diamondback", brand: "Maxxis", compatibility: "motorcycle", price: 2900.0, stock: 3 }
];

const compatibilityIcons = { car: Car, motorcycle: Bike, tricycle: Bike, truck: Truck };

const compatibilityColors = {
  car: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  motorcycle: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  tricycle: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  truck: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
};

export default function Products() {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompatibility, setFilterCompatibility] = useState("all");
  const [filterStock, setFilterStock] = useState("all");

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompatibility = filterCompatibility === "all" || product.compatibility === filterCompatibility;
    const matchesStock =
      filterStock === "all" ||
      (filterStock === "in-stock" && product.stock > 0) ||
      (filterStock === "low-stock" && product.stock > 0 && product.stock <= 5) ||
      (filterStock === "out-of-stock" && product.stock === 0);

    return matchesSearch && matchesCompatibility && matchesStock;
  });

  const formatPrice = price =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(price);

  const getStockStatus = stock => {
    if (stock === 0) return { label: "Out of Stock", color: "text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200" };
    if (stock <= 5) return { label: "Low Stock", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-200" };
    return { label: "In Stock", color: "text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-200" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-gray-100">Products Catalog</h2>
          <p className="text-gray-600 dark:text-gray-400">Browse available tires and check pricing & stock</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Package size={16} />
          <span>{filteredProducts.length} products found</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterCompatibility}
              onChange={e => setFilterCompatibility(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Vehicles</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="tricycle">Tricycle</option>
              <option value="truck">Truck</option>
            </select>

            <select
              value={filterStock}
              onChange={e => setFilterStock(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const Icon = compatibilityIcons[product.compatibility];
          const stockStatus = getStockStatus(product.stock);

          return (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              {/* Product Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">ID: {product.id}</span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${compatibilityColors[product.compatibility]}`}>
                    <Icon size={12} />
                    <span className="capitalize">{product.compatibility}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{product.brand}</p>
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Stock:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{product.stock}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">units</span>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${stockStatus.color}`}>
                  {product.stock > 0 ? <Check size={16} /> : <AlertCircle size={16} />}
                  <span>{stockStatus.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
