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
        </form>
    </React.Fragment>
  )
}
