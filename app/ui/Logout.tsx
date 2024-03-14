
import { useRouter } from "next/navigation";


export default function LogOut() {
  const router = useRouter()
  const handleClickLogOut = () => {
    localStorage.removeItem("token");
    router.push('/')
  }

  return (
    <button
      onClick={handleClickLogOut}
      style={{
        display: "flex",
        width: "10vw",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Log out
    </button>
  );
}
