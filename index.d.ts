/// <reference types="node" />
declare module ws281x {

    export enum StripType {
        WS2812,
        SK6812,
        SK6812W,
    }

    export type Options = {
        /**
         * PWM output frequency
         */
        freq?: number,

        /**
         * DMA number _not_ already in use
         */
        dmaNum?: number,
        /**
         * GPIO Pin with PWM alternate function
         */
        gpioPin?: number,
        /**
         * Invert output signal for inverting level shifters
         */
        invert?: number,
        /**
         * Brightness value between 0 and 255
         */
        brightness?: number,
        /**
         * strip type from ws281x.STRIP_TYPE
         */
        strip_type?: StripType,
        /**
         * Apply gamma correction
         */
        gammaCorrection?: boolean,
    }

    export class ws281x extends NodeJS.EventEmitter {

        /**
         * configures PWM and DMA for sending data to the LEDs
         *
         * @param numLeds  number of LEDs to be controlled
         * @param options  (acutally only tested with default-values)
         *                 intialization-options for the library
         */
        init(numLeds: number, options?: Options): void;

        /**
         * register a mapping to manipulate array-indices within the
         * data-array before rendering.
         *
         * @param mapping  the mapping, indexed by destination.
         */
        setIndexMapping(mapping: Uint16Array | Array<number>): void;

        /**
         * send data to the LED-strip.
         *
         * @param data  the pixel-data, 24(rgb) / 32(rgbw) bit per pixel in
         *              (W)RGB-format (0x00ff0000 is red).
         * 
         * @return data as it was sent to the LED-strip
         */
        render(data: Uint32Array): Uint32Array;

        /**
         * Brightness gets mapped by this value
         *
         * @param brightness  (0-255) 
         */
        setBrightness(brightness: number): void;

        /**
         * clears all LEDs, resets the PWM and DMA-parts and deallocates
         * all internal structures.
         */
        reset(): void;

        /**
         e available StripTypes
         */
        STRIP_TYPES: {
            WS2812:StripType,
            SK6812:StripType,
            SK6812W:StripType,
        };

        /**
         * Map generators
         */
        indexMapping: {
            alternatingMatrix(width: number, height: number): Uint16Array;
            mirrorMatrixX(width: number, height: number): Uint16Array;
        };
    }
}

export = new ws281x.ws281x();