import { AuthForm } from '../components/AuthForm';

const SignIn = () => {
	return <AuthForm mode="signin" />;
};

SignIn.isAuth = true;

export default SignIn;
