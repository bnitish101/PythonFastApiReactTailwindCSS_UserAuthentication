import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export default function Register(props) {
    
    const [dobPicker, setDobPicker] = useState(null);
    // Convert date format to String
    const formatDate = (date) =>{
        let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDay(),
        year = "" + d.getFullYear();
        
        if (month.length < 2 ) month = "0" + month;
        if (day.length < 2 ) day = "0" + day;
        return [day, month, year].join("-");
    }

    const gender_opt = [
        {value: "", label: "Select your gender"},
        {value: "MALE", label: "Male"},
        {value: "FEMALE", label: "Female"},
    ]
    const [formRegister, setFormRegister] = useState({
        name: "",
        username: "",
        email: "",
        phone_number: "",
        password: "",
        birth: "",
        gender: "",
        profile: "",
    })

    const onChangeForm = (label, event) => {
        switch (label) {
          case "name":
            setFormRegister({ ...formRegister, name: event.target.value });
            break;
          case "username":
            setFormRegister({ ...formRegister, username: event.target.value });
            break;
          case "email":
            // email validation
            const email_validation = /\S+@\S+\.\S+/;
            if (email_validation.test(event.target.value)) {
              setFormRegister({ ...formRegister, email: event.target.value });
            }
            break;
          case "phone_number":
            setFormRegister({ ...formRegister, phone_number: event.target.value });
            break;
          case "password":
            setFormRegister({ ...formRegister, password: event.target.value });
            break;
          case "gender":
            setFormRegister({ ...formRegister, gender: event.target.value });
            break;
          case "birth":
            setDobPicker(event);
            setFormRegister({ ...formRegister, birth: formatDate(event) });
            break;
        }
      };

    // submit handler
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        console.log("formData", formRegister)
    }
  return (
    <React.Fragment>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Create An Acount
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 -tracking-wide cursor-pointer mx-auto">
            Welcome
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            <input 
                type="text" name="" id="" placeholder="Name"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) =>{
                    onChangeForm("name", event)
                }}
            />
            <DatePicker 
                // selected={startDate} onChange={(date) => setStartDate(date)}
                selected={dobPicker}
                dateFormat="dd-mm-yyyy"
                placeholderText='Birth Date' 
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) => {
                    onChangeForm("birth", event)
                }}
            />
            <select
              value={formRegister.gender}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                onChangeForm("gender", event);
              }}
            >
              {gender_opt.map((data) => {
                if (data.value === "") {
                  return (
                    <option key={data.label} value={data.value} disabled>
                      {data.label}
                    </option>
                  );
                } else {
                  return (
                    <option key={data.label} value={data.value}>
                      {data.label}
                    </option>
                  );
                }
              })}
            </select>
            <input 
                type="text" name="" id="" placeholder="Username"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) =>{
                    onChangeForm("username", event)
                }}
            />
            <input 
                type="number" name="" id="" placeholder="Phone Number"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) =>{
                    onChangeForm("phone_number", event);
                }}
            />
            <input 
                type="email" name="" id="" placeholder="Email"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) =>{
                    onChangeForm("email", event);
                }}
            />
            <input 
                type="text" name="" id="" placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(event) =>{
                    onChangeForm("password", event);
                }}
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
