import { useState } from "react";
import { User, Save, X } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    number: "09123456789",
    address: "Manila, Philippines",
    socials: "@john_doe",
    bio: "Love cars and tech",
    hobby: "Basketball, Coding",
    resume: null,
    picture: null,
    status: "Approved",
  });

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setForm({ ...form, [e.target.name]: e.target.files[0] });

  const saveChanges = () => {
    setUser({ ...form, status: "Pending" }); // simulate submit -> backend
    setEdit(false);
  };

  const cancelEdit = () => {
    setForm({ ...user }); // revert to original
    setEdit(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Profile
      </h2>

      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 space-y-4">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {user.picture ? (
              <img
                src={URL.createObjectURL(user.picture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            )}
          </div>
          {edit && (
            <input
              type="file"
              name="picture"
              onChange={handleFile}
              className="text-sm"
            />
          )}
        </div>

        {/* Inputs */}
        {["name", "email", "number", "address", "socials", "bio", "hobby"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                disabled={!edit}
                value={edit ? form[field] : user[field]}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg 
                           border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-gray-100 
                           disabled:bg-gray-100 disabled:dark:bg-gray-700"
              />
            </div>
          )
        )}

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Resume (PDF)
          </label>
          {edit ? (
            <input type="file" name="resume" onChange={handleFile} />
          ) : user.resume ? (
            <a
              href={URL.createObjectURL(user.resume)}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm"
            >
              View Uploaded Resume
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No resume uploaded</p>
          )}
        </div>

        {/* Status */}
        <p
          className={`text-sm font-medium ${
            user.status === "Approved"
              ? "text-green-600"
              : user.status === "Pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {user.status}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-500 text-white"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={saveChanges}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                <Save size={16} /> Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
