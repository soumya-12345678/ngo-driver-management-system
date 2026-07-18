import { useState } from "react";

export default function RegisterAuthorizedPerson() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const sendOTP = () => {
    alert("OTP Sent Successfully");
  };

  const register = () => {
    alert("Registered Successfully");
  };

  const cancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[400px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register New Person
        </h2>

        <label className="font-medium">
          Mobile Number
        </label>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          className="w-full border rounded-lg p-3 mt-2 mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={sendOTP}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mb-4"
        >
          Send OTP
        </button>

        <label className="font-medium">
          OTP
        </label>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border rounded-lg p-3 mt-2 mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <label className="font-medium">
          Authorized Person Name
        </label>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border rounded-lg p-3 mt-2 mb-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-4">

          <button
            onClick={register}
            className="flex-1 bg-green-600 text-white p-3 rounded-lg"
          >
            Register
          </button>

          <button
            onClick={cancel}
            className="flex-1 bg-red-500 text-white p-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}