import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  async function sendOTP() {

    try {

      await api.post("/password/forgot", {
        email,
      });

      alert("OTP Sent");

      setStep(2);

    } catch (error) {

      alert(error.response?.data?.detail || "Error");

    }

  }

  async function verifyOTP() {

    try {

      await api.post("/password/verify", {
        email,
        otp,
      });

      alert("OTP Verified");

      setStep(3);

    } catch (error) {

      alert(error.response?.data?.detail || "Invalid OTP");

    }

  }

  async function resetPassword() {

    try {

      await api.post("/password/reset", {

        email,

        otp,

        new_password: password,

      });

      alert("Password Changed Successfully");

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.detail || "Error");

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950">

      <div className="w-[430px] bg-white/10 backdrop-blur-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center">

          Forgot Password

        </h1>

        {step === 1 && (

          <>

            <input

              className="w-full mt-8 bg-slate-900 p-4 rounded-xl"

              placeholder="Email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

            />

            <button

              onClick={sendOTP}

              className="w-full mt-6 bg-blue-600 p-4 rounded-xl"

            >

              Send OTP

            </button>

          </>

        )}

        {step === 2 && (

          <>

            <input

              className="w-full mt-8 bg-slate-900 p-4 rounded-xl"

              placeholder="Enter OTP"

              value={otp}

              onChange={(e)=>setOtp(e.target.value)}

            />

            <button

              onClick={verifyOTP}

              className="w-full mt-6 bg-green-600 p-4 rounded-xl"

            >

              Verify OTP

            </button>

          </>

        )}

        {step === 3 && (

          <>

            <input

              type="password"

              className="w-full mt-8 bg-slate-900 p-4 rounded-xl"

              placeholder="New Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

            />

            <button

              onClick={resetPassword}

              className="w-full mt-6 bg-purple-600 p-4 rounded-xl"

            >

              Reset Password

            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default ForgotPassword;