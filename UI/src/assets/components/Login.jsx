import React from 'react';

const Login = () => {
  return (
    <div className="bg-gray-800 text-white py-8 px-10 rounded-lg w-96 mx-auto my-20">
      <h2 className="text-2xl mb-6">Sign in</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold mb-2">SIGN IN WITH ACCOUNT NAME</label>
          <input type="text" id="username" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Username"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">PASSWORD</label>
          <input type="password" id="password" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Password"/>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <input type="checkbox" id="remember-me"/>
            <label htmlFor="remember-me" className="ml-2 text-sm">Remember me</label>
          </div>
          <a href="/profile" className="text-sm text-blue-300 hover:text-blue-400">Help, I can't sign in</a>
        </div>
        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign in</button>
      </div>
    </div>
  );
}

export default Login;
