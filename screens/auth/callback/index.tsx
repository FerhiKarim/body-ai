import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { useRouter } from "@unitools/router";
import React, { useEffect, useRef } from "react";
import { AuthLayout } from "../layout";

const CallbackScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasHandledCallback.current) return;
      hasHandledCallback.current = true;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          toast.show({
            placement: "bottom right",
            render: ({ id }) => {
              return (
                <Toast nativeID={id} variant="outline" action="error">
                  <ToastTitle>{error.message}</ToastTitle>
                </Toast>
              );
            },
          });
          router.push("/auth/signin");
          return;
        }

        if (session) {
          toast.show({
            placement: "bottom right",
            render: ({ id }) => {
              return (
                <Toast nativeID={id} variant="outline" action="success">
                  <ToastTitle>Successfully signed in!</ToastTitle>
                </Toast>
              );
            },
          });
          // Only redirect to the app root here. Let RouteGuard handle onboarding.
          router.replace("/(app)/(tabs)");
        }
      } catch (error) {
        toast.show({
          placement: "bottom right",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} variant="outline" action="error">
                <ToastTitle>An error occurred. Please try again.</ToastTitle>
              </Toast>
            );
          },
        });
        router.push("/auth/signin");
      }
    };

    handleCallback();
  }, [router, toast]);

  return (
    <VStack className="w-full h-full items-center justify-center">
      <Text>Completing sign in...</Text>
    </VStack>
  );
};

export const Callback = () => {
  return (
    <AuthLayout>
      <CallbackScreen />
    </AuthLayout>
  );
};