import { Dimensions } from 'react-native';

const dim = Dimensions.get('screen');

const msp = (dim, limit) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};
 
/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};
 
/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
 
/**
 * Returns true if the device is a tablet
 */
export const isTablet = () => {
    const dim = Dimensions.get('screen');
    console.log(dim.scale < 2 && msp(dim, 1000));
    console.log(dim.scale >= 2 && msp(dim, 1900));
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
    
};
 
