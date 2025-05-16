import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { supabase } from '@/lib/supabase';
import { useRouter } from '@unitools/router';
import { useEffect, useState } from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndOnboarding();
  }, []); // Only run on mount

  const checkAuthAndOnboarding = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      // No session? Redirect to sign-in (unless already there)
      if (!session && !router.pathname.startsWith('/auth')) {
        router.replace('/auth/signin');
        return;
      }

      // Session exists? Check onboarding status
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_completed_onboarding')
          .eq('id', session.user.id)
          .single();

        // Redirect to onboarding if incomplete and not already there
        if (!profile?.has_completed_onboarding && !router.pathname.startsWith('/onboarding')) {
          router.replace('/onboarding/weight');
          return;
        }

        // If onboarding is complete but user is on auth pages, redirect to app

      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Spinner size="lg" />
      </VStack>
    );
  }

  return children;
}