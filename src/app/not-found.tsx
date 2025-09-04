import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="common-box">
      <div className="container">
        <div className="flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <div className="max-w-xl">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-pulse">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-primary px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition">
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
