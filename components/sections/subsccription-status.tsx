"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions'; // Import httpsCallable
import {  db, functions } from '@/lib/firebase'; // Import auth, db, functions
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';

export default function SubscriptionStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const canceled = searchParams.get('canceled');
  const { user, loading: authLoading } = useAuth(); // Get user from AuthProvider
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return; // Wait for authentication state to load

    if (!user) {
      // If no user is authenticated, redirect to home page
      router.push('/');
      return;
    }

    // Listen for real-time updates to the user's subscription status in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const currentStatus = userData?.subscription?.status || 'unknown';
        setSubscriptionStatus(currentStatus);
        setDataLoading(false);

        if (session_id && currentStatus === 'active') {
          setMessage('Congratulations! Your subscription is now active.');
        } else if (canceled) {
          setMessage('Your subscription process was canceled. You can try again or select a different plan.');
        } else if (currentStatus === 'active') {
          setMessage('Your subscription is currently active. Thank you!');
        } else if (['canceled', 'past_due', 'unpaid', 'incomplete'].includes(currentStatus)) {
          setMessage(`Your subscription status is: ${currentStatus}. Please update your payment method or renew.`);
        } else {
          setMessage('Checking your subscription status...');
        }
      } else {
        setMessage('User data not found in Firestore. Please ensure you are logged in.');
        setDataLoading(false);
      }
    }, (error: unknown) => {
      console.error("Error fetching Firestore subscription status:", error);
      if (error instanceof Error) {
        setMessage(`Failed to retrieve subscription status: ${error.message}`);
      } else {
        setMessage('Failed to retrieve subscription status due to an unknown error.');
      }
      setDataLoading(false);
    });

    return () => unsubscribeFirestore(); // Cleanup Firestore listener
  }, [user, authLoading, session_id, canceled, router]);

  const handleManageSubscription = async () => {
    if (!user) {
      setMessage("Please sign in to manage your subscription.");
      return;
    }
    setMessage("Opening Stripe Customer Portal...");
    try {
      const createPortalLink = httpsCallable(functions, 'createCustomerPortalLink'); // Requires this Cloud Function
      const { data } = await createPortalLink({ returnUrl: window.location.origin + '/subscription-status' });
      const portalData = data as { url: string };
      router.push(portalData.url); // Redirect to Stripe Customer Portal
    } catch (err: unknown) {
      console.error('Error opening customer portal:', err);
      if (err instanceof Error) {
        setMessage(`Failed to open customer portal: ${err.message}`);
      } else {
        setMessage('Failed to open customer portal due to an unknown error.');
      }
    }
  };

  const handleRequestNewsletter = async () => {
    if (!user) {
      setMessage('Please sign in to request the newsletter.');
      return;
    }
    setMessage('Sending request for newsletter...');
    try {
      const requestNews = httpsCallable(functions, 'requestNewsletter');
      const result = await requestNews();
      setMessage((result.data as { message: string }).message);
    } catch (err: unknown) {
      console.error('Error requesting newsletter:', err);
      if (err instanceof Error) {
        setMessage(`Failed to request newsletter: ${err.message}`);
      } else {
        setMessage('Failed to request newsletter due to an unknown error.');
      }
    }

  };


  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading subscription status...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full p-6 text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg mb-4">{message}</p>
          {subscriptionStatus && (
            <p className="text-xl font-semibold mb-6">Current Status: <span className={`font-bold ${subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{subscriptionStatus.toUpperCase()}</span></p>
          )}
          <div className="flex flex-col gap-4">
            <Button onClick={() => router.push('/pricing')}>
              View Plans
            </Button>
            {user && subscriptionStatus !== 'active' && (
              <Button variant="outline" onClick={() => router.push('/')}>
                Go to Homepage
              </Button>
            )}
            {user && subscriptionStatus === 'active' && (
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                Go to Dashboard
              </Button>
            )}
            {user && (subscriptionStatus === 'active' || subscriptionStatus === 'incomplete_expired' || subscriptionStatus === 'trialing') && (
              <Button variant="outline" onClick={handleManageSubscription}>
                Manage Your Subscription
              </Button>
            )}
            {user && (
              <Button variant="outline" onClick={handleRequestNewsletter}>
                Request Today&#39;s Newsletter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}