import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { SessionContext } from "@/providers/SessionProvider";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";

const index = () => {
  const { isAuthenticated, session } = useContext(SessionContext);
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated && session) {
      router.replace("/(app)/(tabs)/profile");
    }
  }, [isAuthenticated, session]);
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
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
        return;
      }

      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="outline" action="success">
              <ToastTitle>Successfully signed out!</ToastTitle>
            </Toast>
          );
        },
      });
      router.push("/auth/signin");
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
    }
  };

  return (
    <SafeAreaView className="md:flex flex-col items-center justify-center md:w-full h-full">
      <VStack className="p-2 md:max-w-[440px] w-full" space="xl">
        {
          (isAuthenticated && session) ? (
            <VStack className="w-full p-4 bg-background-100 rounded-lg" space="sm">
            <Text className="font-semibold">Session Information</Text>
            <HStack className="justify-between">
                <Text className="text-background-600">Email:</Text>
                <Text>{session.user.email}</Text>
            </HStack>
            <HStack className="justify-between">
                <Text className="text-background-600">Provider:</Text>
                <Text>{session.user.app_metadata.provider}</Text>
            </HStack>
            <HStack className="justify-between">
                <Text className="text-background-600">Last Sign In:</Text>
                <Text>{new Date(session.user.last_sign_in_at).toLocaleString()}</Text>
            </HStack>
            <Button
            variant="outline"
            action="secondary"
            onPress={handleLogout}
            >
            <ButtonText>Sign out</ButtonText>
            </Button>
            </VStack>
          ) : (
            <>
              <Button
                  onPress={() => {
                  router.push("/auth/splash-screen");
                  }}
              >
                  <ButtonText>SplashScreen</ButtonText>
              </Button>
              <Button
                  className="w-full"
                  onPress={() => {
                  router.push("/auth/signin");
                  }}
              >
                  <ButtonText>Sign in</ButtonText>
              </Button>
              <Button
                  onPress={() => {
                  router.push("/auth/signup");
                  }}
              >
                  <ButtonText>Sign up</ButtonText>
              </Button>
              <Button
                  onPress={() => {
                  router.push("/auth/forgot-password");
                  }}
              >
                  <ButtonText>Forgot password</ButtonText>
              </Button>
            </>
          )
        }
      </VStack>
    </SafeAreaView>
  );
};

export default index;
