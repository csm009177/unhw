
import Link from "next/link";
import LotationMent from "./LotationMent";

export default function Lobby() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#434343",
          color:'white'
        }}
      >
        <LotationMent />
      </div>
      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#373737",
          color:'white'
        }}
      >
        <Link href="/login">login</Link>
        <br />
        <Link href="/signup">signup</Link>
      </div>
    </div>
  );
}
