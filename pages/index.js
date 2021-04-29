import Navbar from "../components/Navbar";
import { useSession } from 'next-auth/client';
import Image from 'next/image'
import Landing from "../components/Landing";
import MailForm from "../components/MailForm";
import { Box } from "@chakra-ui/layout";

export default function Index() {
  const [session, loading] = useSession()

  if (loading) {
  return (
    <Box h="100vh" w="100vw">
      <Image
        src="/preloader.svg"
        alt="Preloader"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  )
  }

  return (
    <>
      <Navbar session={session} />
      {session ? <MailForm /> : <Landing />}
    </>
  )
}