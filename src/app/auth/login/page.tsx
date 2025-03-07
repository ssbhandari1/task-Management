"use client";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token } = res.data;

      if (token) {
        localStorage.setItem("authToken", token);
        router.push("/");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center mt-10 mb-10">
      <div className="mx-auto text-left flex justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 bg-white shadow-xl my-10">
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif">Login</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
              Login with your email and password
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                    <MdOutlineMailOutline className="text-gray-400" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    autoComplete="email"
                    className="py-2 pl-10 w-full border text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                    <FiLock className="text-gray-400" />
                  </span>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="py-2 pl-10 w-full border text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11"
                  />
                </div>
              </div>
              <button
              type="submit"
              className="w-full py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
            >
                Login
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-900 mt-4">
            <div className="text-gray-500 mt-2.5">
              Dont have an account?
              <span className="capitalize text-gray-800 hover:text-cyan-500 font-bold mx-2 cursor-pointer">
              <Link href="/auth/signup"> Sign Up</Link> 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
