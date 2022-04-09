import { GradientLayout } from '../components/GradientLayout';

const Home = () => {
	return (
		<GradientLayout
			image="https://bit.ly/dan-abramov"
			title="Dan Abramov"
			subtitle="profile"
			description="11 followers"
			color="red"
			isImageRound
		>
			Hello
		</GradientLayout>
	);
};

export default Home;
