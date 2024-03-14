import Link from 'next/link';

export default function LogOut() {

  const handleClickLogOut = () => {
    localStorage.removeItem("token");
  };

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
      <Link href={"/"}>Log out</Link>
    </button>
  );
}
