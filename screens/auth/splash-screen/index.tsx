import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "@unitools/router";
import { useColorScheme } from "nativewind";
import { AuthLayout } from "../layout";
import { Logo } from "./assets/icons/logo";

const SplashScreenWithLeftBackground = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="lg"
    >
      <Icon as={Logo} className="w-[219px] h-10" />

      <VStack className="w-full" space="lg">
        <Button
          className="w-full"
          onPress={() => {
            router.push("/auth/signin");
          }}
        >
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/auth/signup");
          }}
        >
          <ButtonText className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const SplashScreen = () => {
  return (
    <AuthLayout>
      <SplashScreenWithLeftBackground />
    </AuthLayout>
  );
};
