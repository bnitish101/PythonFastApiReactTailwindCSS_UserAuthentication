import React from 'react'

export default function Login() {
  return (
    <React.Fragment>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Welcome
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 -tracking-wide cursor-pointer mx-auto">
            Please login to your account!
        </p>
        <form>
          <div className="space-y-4">
            <input 
                type="text" name="" id="" placeholder="Username"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
            <input 
                type="text" name="" id="" placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
          </div>
          <div className="text-center mt-6">
            <button
                type="submit" 
                className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
                >
                Sign In
            </button>
            <p>
              You don't have an account?{" "} 
              <span className="underline cursor-pointer">Register</span> or {" "}
              <span className="underline cursor-pointer">Forgot password?</span>   
            </p>
          </div>
        </form>
    </React.Fragment>
  )
}
