import { UserButton, useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Video Chat App</h1>
          <div className="flex items-center gap-4">
            {isLoaded && isSignedIn && (
              <>
                <span className="text-sm text-gray-700">
                  {user.firstName || user.username}
                </span>
                <UserButton afterSignOutUrl="/sign-in" />
              </>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
