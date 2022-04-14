/* eslint-disable jsx-a11y/aria-proptypes */
import { Box, Center, HStack, Text } from '@chakra-ui/layout';
import ReactHowler from 'react-howler';
import {
	ButtonGroup,
	IconButton,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
} from '@chakra-ui/react';
import {
	BsArrowRepeat,
	BsFillPauseFill,
	BsFillPlayFill,
	BsFillSkipEndFill,
	BsFillSkipStartFill,
	BsShuffle,
} from 'react-icons/bs';
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { formatSongDuration } from '../../lib/formatter';

export const Player = ({ activeSong, activeSongs }) => {
	const howlerRef = React.useRef(null);
	const changeActiveSong = useStoreActions(
		(store: any) => store.changeActiveSong
	);
	const [isPlaying, setIsPlaying] = React.useState(true);
	const [isShuffle, setIsShuffle] = React.useState(false);
	const [isRepeat, setIsRepeat] = React.useState(false);
	const isRepeatRef = React.useRef(false);
	const [index, setIndex] = React.useState(activeSongs.indexOf(activeSong));
	const [duration, setDuration] = React.useState(0);
	const [seek, setSeek] = React.useState(0);
	const [isSeeking, setIsSeeking] = React.useState(false);

	React.useEffect(() => {
		let requestId;
		if (isPlaying && !isSeeking) {
			const f = () => {
				setSeek(howlerRef.current?.seek().toFixed(2));
				requestId = requestAnimationFrame(f);
			};
			requestId = requestAnimationFrame(f);
		}
		return () => cancelAnimationFrame(requestId);
	}, [isPlaying, isSeeking]);

	React.useEffect(() => {
		isRepeatRef.current = isRepeat;
	}, [isRepeat]);

	React.useEffect(() => {
		changeActiveSong(activeSongs[index]);
	}, [activeSongs, changeActiveSong, index]);

	const handleLoad = () => {
		setDuration(howlerRef.current.duration().toFixed(2));
	};

	const handleSeekChange = (values) => {
		setSeek(values[0]);
		howlerRef.current?.seek(values[0]);
	};

	const handlePrev = () => {
		setIndex((prevIndex) =>
			prevIndex ? prevIndex - 1 : activeSongs.length - 1
		);
	};

	const getRandomIndex = (prevIndex) => {
		const randomIndex = Math.floor(Math.random() * activeSongs.length);

		if (randomIndex === prevIndex) {
			return getRandomIndex(prevIndex);
		}
		return randomIndex;
	};

	const handleNext = () => {
		if (isShuffle) {
			return setIndex((prevIndex) => getRandomIndex(prevIndex));
		}
		setIndex((prevIndex) =>
			prevIndex === activeSongs.length - 1 ? 0 : index + 1
		);
	};

	const handleSongEnd = () => {
		if (isRepeatRef.current) {
			setSeek(0);
			howlerRef.current.seek(0);
		} else {
			handleNext();
		}
	};

	return (
		<Box>
			<ReactHowler
				ref={howlerRef}
				playing={isPlaying}
				src={activeSong.url}
				onLoad={handleLoad}
				onEnd={handleSongEnd}
			/>
			<Center>
				<ButtonGroup variant="link" fontSize={24}>
					<IconButton
						aria-label="shuffle"
						icon={<BsShuffle />}
						onClick={() => setIsShuffle((state) => !state)}
						color={isShuffle ? 'gray.200' : 'gray.600'}
					/>
					<IconButton
						aria-label="previous"
						icon={<BsFillSkipStartFill />}
						color="gray.600"
						onClick={handlePrev}
					/>
					{isPlaying ? (
						<IconButton
							aria-label="pause"
							icon={<BsFillPauseFill />}
							fontSize={40}
							onClick={() => setIsPlaying(false)}
							color="gray.200"
						/>
					) : (
						<IconButton
							aria-label="play"
							icon={<BsFillPlayFill />}
							fontSize={40}
							onClick={() => setIsPlaying(true)}
							color="gray.200"
						/>
					)}
					<IconButton
						aria-label="next"
						icon={<BsFillSkipEndFill />}
						color="gray.600"
						onClick={handleNext}
					/>
					<IconButton
						aria-label="repeat"
						icon={<BsArrowRepeat />}
						onClick={() => setIsRepeat((state) => !state)}
						color={isRepeat ? 'gray.200' : 'gray.600'}
					/>
				</ButtonGroup>
			</Center>
			<HStack spacing={4}>
				<Text>{formatSongDuration(seek)}</Text>
				<RangeSlider
					flexGrow={1}
					min={0}
					max={duration}
					step={0.1}
					aria-label={['seekbar']}
					onChange={handleSeekChange}
					onChangeStart={() => setIsSeeking(true)}
					onChangeEnd={() => setIsSeeking(false)}
					value={[seek]}
				>
					<RangeSliderTrack bgColor="gray.600">
						<RangeSliderFilledTrack bgColor="gray.300" />
					</RangeSliderTrack>
					<RangeSliderThumb index={0} />
				</RangeSlider>
				<Text>{formatSongDuration(duration)}</Text>
			</HStack>
		</Box>
	);
};
