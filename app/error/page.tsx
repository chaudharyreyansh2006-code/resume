'use client'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2 text-gray-600">Sorry, something went wrong with authentication.</p>
        <a href="/login" className="mt-4 inline-block text-blue-600 hover:underline">
          Try again
        </a>
      </div>
    </div>
  )
}