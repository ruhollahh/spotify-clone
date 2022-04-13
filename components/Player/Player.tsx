/* eslint-disable jsx-a11y/aria-proptypes */
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
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

export const Player = () => {
	return (
		<Box>
			<Center>
				<ButtonGroup variant="link" color="gray.600" fontSize={24}>
					<IconButton aria-label="shuffle" icon={<BsShuffle />} />
					<IconButton aria-label="previous" icon={<BsFillSkipStartFill />} />
					<IconButton
						aria-label="play"
						icon={<BsFillPlayFill />}
						fontSize={40}
					/>
					{/* <IconButton
						aria-label="pause"
						icon={<BsFillPauseFill />}
						fontSize={40}
					/> */}
					<IconButton aria-label="next" icon={<BsFillSkipEndFill />} />
					<IconButton aria-label="repeat" icon={<BsArrowRepeat />} />
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
