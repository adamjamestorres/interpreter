import { SignInButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import TextField from "@/components/TextField";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  
  // Handle redirect after sign in
  const redirectPath = router.query.redirect as string;

  // Effect to handle redirect after sign in
  useEffect(() => {
    if (isSignedIn && redirectPath) {
      router.push(redirectPath);
    }
  }, [isSignedIn, redirectPath, router]);

  if (!isLoaded) {
    return null;
  }

  const handleCreateMeeting = () => {
    const newMeetingId = nanoid();
    router.push(`/meeting/${newMeetingId}`);
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId) {
      router.push(`/meeting/${meetingId}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        {!isSignedIn ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to Video Chat App
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              Sign in to start or join a video call with your team.
            </p>
            <div className="mt-10">
              <SignInButton mode="modal">
                <Button size="lg">Sign In to Get Started</Button>
              </SignInButton>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Start a New Meeting
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              Create a new meeting or join an existing one.
            </p>
            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={handleCreateMeeting}>
                  Create Meeting
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowJoinForm(true)}
                >
                  Join Meeting
                </Button>
              </div>
              {showJoinForm && (
                <form
                  onSubmit={handleJoinMeeting}
                  className="mt-4 flex flex-col items-center gap-4"
                >
                  <TextField
                    placeholder="Enter meeting ID"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    className="w-64"
                  />
                  <Button type="submit" disabled={!meetingId}>
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
