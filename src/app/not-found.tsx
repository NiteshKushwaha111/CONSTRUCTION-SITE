import Link from 'next/link'
import { HardHat, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full text-center p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary mx-auto mb-6 flex items-center justify-center">
          <HardHat className="h-8 w-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Error 404</span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 mb-3">
          Page Under Construction
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The requested construction project, service, or URL does not exist or may have been relocated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
