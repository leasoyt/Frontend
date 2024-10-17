import React from "react";

const LoginView = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center"
      // style={{
      //   backgroundImage:
      //     "url('https://i.pinimg.com/enabled_hi/564x/53/8c/ce/538cce1a38c881743194c6d9e19fdcfa.jpg')",
      //   backgroundSize: "contain",
      //   backgroundPosition: "center",
      //     backgroundRepeat: "no-repeat",
      // }}
    >
      <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif ">
        Rest0
      </h1>
      <form className="w-full max-w-sm">
        <div className="mb-6">
          <label
            className="block text-gray-500  mb-2 text-center font-medium text-lg"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            placeholder="Rest012"
            className="w-full px-4 py-2  border-gray-300 rounded-lg bg-gray-200 focus:outline-none  text-black font-sans"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-500 text-lg  mb-2 text-center font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="jane@framer.com"
            className="w-full px-4 py-2  border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black  font-sans"
          />
        </div>
        <button
          type="submit"
          className="w-44 bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginView;
