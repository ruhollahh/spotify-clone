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

export const Player = ({ activeSong, activeSongs }) => {
	const [isPlaying, setIsPlaying] = React.useState(true);
	const [isShuffle, setIsShuffle] = React.useState(false);
	const [isRepeat, setIsRepeat] = React.useState(false);

	return (
		<Box>
			<ReactHowler playing={isPlaying} src={activeSong.url} />
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
				<Text>1:23</Text>
				<RangeSlider
					flexGrow={1}
					min={0}
					max={300}
					step={0.1}
					aria-label={['seekbar']}
				>
					<RangeSliderTrack bgColor="gray.600">
						<RangeSliderFilledTrack bgColor="gray.300" />
					</RangeSliderTrack>
					<RangeSliderThumb index={0} />
				</RangeSlider>
				<Text>3:54</Text>
			</HStack>
		</Box>
	);
};
