import { Button } from "@chakra-ui/button";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';
import { useState } from "react";
import { signIn } from "next-auth/client";
import { SimpleGrid } from "@chakra-ui/layout";

export default function Landing() {
  const [loading, setLoading] = useState(false)
  const handleSignIn = () => {
    setLoading(true)
    return signIn("google")
  }
  return(
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} padding={4}>
    <Image
      src="/landing.svg"
      alt="Landing vector"
      width="1000"
      height="841.56"
      layout="intrinsic"
    />
      <VStack spacing={8} justify="center">
      <Heading fontSize={{ base: "2xl", md: "4xl" }}>
        Make. Modify. Mail.
      </Heading>
      <Heading size="md" fontWeight="hairline" align="center">
        In 3 steps, send personalized emails (with custom images) in bulk to everyone in your contact list!
      </Heading>
      <Button 
        variant="outline" 
        leftIcon={<FcGoogle/>}
        isLoading={loading}
        loadingText="Signing in"
        onClick={handleSignIn}
      >
        Sign in with Google
      </Button>
    </VStack>
    </SimpleGrid>
  )
}