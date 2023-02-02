import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export default function Register(props) {
    const [dobPicker, setDobPicker] = useState(null); 
    const gender_opt = [
        {value: "", label: "Select your gender"},
        {value: "MALE", label: "Male"},
        {value: "FEMALE", label: "Female"},
    ]
    const [formRegister, setFormRegister] = useState({
        name: "",
        username: "",
        eamil: "",
        phone_number: "",
        password: "",
        birth: "",
        gender: "",
        profile: "",
    })
  return (
    <React.Fragment>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Create An Acount
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 -tracking-wide cursor-pointer mx-auto">
            Welcome
        </p>
        <form>
          <div className="space-y-4">
            <input 
                type="text" name="" id="" placeholder="Name"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
            <DatePicker 
                // selected={startDate} onChange={(date) => setStartDate(date)}
                selected={dobPicker}
                dateFormat="dd-mm-yyyy"
                placeholderText='Birth Date' 
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
            <select
                value={formRegister.gender} 
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            >
                {gender_opt.map((data)=>{
                        if(data.value === ""){
                            return(
                                <option key={data.label} value={data.value} disabled={true}>
                                    {data.label}
                                </option>
                            )
                        }else{
                            return(
                                <option key={data.label} value={data.value} disabled={true}>
                                    {data.label}
                                </option>
                            )
                        }
                    }
                )}
                <option value=""></option>
            </select>
            <input 
                type="text" name="" id="" placeholder="Username"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
            <input 
                type="number" name="" id="" placeholder="Phone Number"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            />
            <input 
                type="email" name="" id="" placeholder="Email"
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
                Create Account
            </button>
            <p>
              Already have account?{" "} 
              <Link
                to={"/?login"}
                onClick={() => {props.setPage("login")}}
              >
                    <span className="underline cursor-pointer">Sign In</span>   
              </Link>
            </p>
          </div>
        </form>
    </React.Fragment>
  )
}
