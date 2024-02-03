import "../App.css";

function Login() {
  return (
    <form className="Login">
      <input placeholder="type ID here" style={{marginTop:"auto"}}></input>
      <input placeholder="type PW here"></input>
      <button style={{color:"green"}}>submit</button>
    </form>
  );
}

export default Login;
