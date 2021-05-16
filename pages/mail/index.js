import { useRouter } from "next/router";
import MailForm from "../../components/MailForm";

export default function Mail({ session }) {
  const router = useRouter();
  if (!session)
    router.push("/");
  return <MailForm/>
}