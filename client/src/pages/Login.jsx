import React from "react";
import { FaUserGraduate, FaLock, FaBug } from "react-icons/fa6";
import { motion } from "framer-motion";

const LoginPage = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 via-orange-100 to-teal-200">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center mb-6">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-yellow-500 text-6xl"
                    >
                        <FaBug />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800 mt-2">
                        Jugnoo <span className="text-teal-600">EdTech</span>
                    </h1>
                    <p className="text-gray-500 text-sm">Learning made bright and fun 🌟</p>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-teal-400">
                            <FaUserGraduate className="text-teal-500 mr-2" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-teal-400">
                            <FaLock className="text-teal-500 mr-2" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 mt-4 text-white bg-teal-500 rounded-xl font-semibold shadow-md hover:bg-teal-600 transition duration-300"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Links */}
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-teal-500 font-semibold hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage
