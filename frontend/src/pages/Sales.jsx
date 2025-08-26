import { useState } from "react";

export default function Sales() {
  const [cart, setCart] = useState([]); // selected products
  const [history, setHistory] = useState([]); // transaction records
  const [showHistory, setShowHistory] = useState(false); // toggle modal

  // Example function to confirm transaction
  const confirmTransaction = () => {
    if (cart.length === 0) return;
    const newTransaction = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleString(),
    };
    setHistory([newTransaction, ...history]);
    setCart([]); // reset after transaction
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Sales</h2>

      {/* Example Product Selection UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setCart([...cart, { name: "Tire A", price: 1200 }])}
        >
          Tire A - ₱1200
        </button>
        <button
          className="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setCart([...cart, { name: "Tire B", price: 1500 }])}
        >
          Tire B - ₱1500
        </button>
      </div>

      {/* Selected Products (Cart) */}
      <div className="mt-6 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <h3 className="font-semibold mb-2">Selected Products</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">No products selected.</p>
        ) : (
          <ul className="space-y-1">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>₱{item.price}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-bold">
          Total: ₱{cart.reduce((sum, item) => sum + item.price, 0)}
        </p>
        <button
          onClick={confirmTransaction}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm Transaction
        </button>
      </div>

      {/* View History Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowHistory(true)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          View History
        </button>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-4">Transaction History</h3>
            {history.length === 0 ? (
              <p className="text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {history.map((tx) => (
                  <li key={tx.id} className="border-b pb-2">
                    <p className="text-sm text-gray-500">{tx.date}</p>
                    <ul className="pl-4 text-sm">
                      {tx.items.map((item, i) => (
                        <li key={i}>
                          {item.name} - ₱{item.price}
                        </li>
                      ))}
                    </ul>
                    <p className="font-bold mt-1">Total: ₱{tx.total}</p>
                  </li>
                ))}
              </ul>
            )}
            {/* Close button */}
            <button
              onClick={() => setShowHistory(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
