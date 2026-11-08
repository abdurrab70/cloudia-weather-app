export default function ErrorPages() {
  return (
    <main className="flex max-h-full w-full justify-center items-center">
      <div className="text-center">
        <p className="text-7xl font-extraboldbold text-blue-300">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-600 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/home"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
          <a
            href="/support"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
