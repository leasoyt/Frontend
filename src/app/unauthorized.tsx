import Link from "next/link";

export default function Unauthorized() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-black mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
            Ups!
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Acceso no autorizado
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Lo sentimos, no tienes permisos para acceder a esta página.
          </p>
          <Link
            href="/"
            className="inline-flex bg-black text-white hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-900 my-4"
          >
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
