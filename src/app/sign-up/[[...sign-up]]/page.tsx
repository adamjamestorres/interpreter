import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { headers } from 'next/headers'

async function SignUpPage() {
  const headersList = await headers();
  const csp = headersList.get('Content-Security-Policy');

  return (
    <div className="w-svw h-svh flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
