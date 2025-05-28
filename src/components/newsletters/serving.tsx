export default function Serving() {
  return (
      <div className="mx-auto bg-gray-900">
        <div className="relative isolate overflow-hidden px-6 pb-24 shadow-2xl sm:px-24 xl:pb-32">
          
          <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
            📍 Serving South Surrey - White Rock<br />
            🎯 Bookings Open for Fall/{new Date().getFullYear()}
          </p>

          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get notified when we’re launching
          </h2>
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>
  )
}
