import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        size="large"
        width={250}
        logo_alignment="center"
      />
    </div>
  );
};

export default Login;
