// components/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import getDoc
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    if (isSignInWithEmailLink(auth, window.location.href)) {
      setLoading(true);
      setError(null);
      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        email = window.prompt('Please provide your email for confirmation:');
        if (!email) {
          setError('Email is required to complete sign-in.');
          setLoading(false);
          return;
        }
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          localStorage.removeItem('emailForSignIn');
          setUser(result.user);
          setLoading(false);
          console.log("User signed in successfully with email link:", result.user);

          const userDocRef = doc(db, "users", result.user.uid);
          const userDocSnap = await getDoc(userDocRef);

          // Check if the user already has an active subscription.
          // If not, grant a 14-day free trial.
          const currentSubscriptionStatus = userDocSnap.exists() ? userDocSnap.data()?.subscription?.status : null;

          if (currentSubscriptionStatus !== 'active') {
            const trialStartDate = new Date();
            const trialEndDate = new Date();
            trialEndDate.setDate(trialEndDate.getDate() + 14); // 14 days from now

            await setDoc(userDocRef, {
              email: result.user.email,
              subscription: {
                status: 'trialing',
                plan: 'free_trial',
                trialStartDate: trialStartDate.toISOString(),
                trialEndDate: trialEndDate.toISOString(),
              }
            }, { merge: true });
            console.log("User granted 14-day free trial.");
            // Optionally redirect to a specific trial landing page or message
             router.push('/#pricing?trial=true'); // Redirect to pricing, but indicate trial status
          } else {
             // User is already active, just log them in
             await setDoc(userDocRef, {
                 email: result.user.email,
                 // Preserve existing subscription status if active
             }, { merge: true });
             router.push('/#pricing'); // Or wherever active users go
          }


        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
          setError(error.message);
          setLoading(false);
          router.push('/'); // Redirect to home on error
        });
    }

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
