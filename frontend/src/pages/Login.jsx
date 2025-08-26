import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake login, later replace with API
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2"
          />
          <button className="bg-blue-600 text-white py-2 rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
}
