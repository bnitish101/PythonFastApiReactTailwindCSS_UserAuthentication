import axios from 'axios';
import React, { useState } from 'react'

export default function Home() {

  const [user, setUser] = useState({})

  useState( ()=>{
    // get token from localStorage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    // token must have auth_token_type and then auth_token
    const token =  auth_token_type + " " + auth_token;
    console.log("my_token", token)
    // console.log("my_token: ", token)

    // fetch data from get user API
    axios
    .get("http://127.0.0.1:8000/users/", {
      headers: { Authorization: token },
    })
    .then( (response) => {
      console.log("response: ", response)
    })
    .catch((error) => {
      console.log("error: ", error)
    });

  }, [])
  return (
    <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          alt="profile"
          src='user.profile'
        />
        <div className="text-center mt-2 text-3xl font-medium">[user.name]</div>
        <div className="text-center mt-2 font-light text-sm">
          @[user.username]
        </div>
        <div className="text-center font-normal text-lg">[user.email]</div>
        <div className="px-6 text-center mt-2 font-light text-sm">
          <p>[user.birth]</p>
        </div>
        <hr className="mt-8"></hr>
        <div className="flex p-4">
          <div className="w-1/2 text-center">
            <span className="font-bold">[user.sex]</span>
          </div>
          <div className="w-0 border border-gra-300"></div>
          <div className="w-1/2 text-center">
            <span className="font-bold">[user.phone_number]</span>
          </div>
        </div>
        <hr className="mt-3"></hr>
        <div className="flex p-2">
          <div className="w-full text-center">
            <button
              className="py-3 w-64 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
