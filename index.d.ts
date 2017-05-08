/// <reference types="node" />

declare enum stripType {
    WS2812_STRIP,
    SK6812_STRIP,
    SK6812W_STRIP,
}

interface ws281xOptions {
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
    strip_type?: stripType,
    /**
     * Apply gamma correction
     */
    gammaCorrection?: boolean,
}

declare class ws281x extends NodeJS.EventEmitter {

    /**
     * configures PWM and DMA for sending data to the LEDs
     *
     * @param numLeds  number of LEDs to be controlled
     * @param options  (acutally only tested with default-values)
     *                 intialization-options for the library
     */
    init(numLeds: number, options?: ws281xOptions): void;

    /**
     * register a mapping to manipulate array-indices within the
     * data-array before rendering.
     *
     * @param mapping  the mapping, indexed by destination.
     */
    setIndexMapping(mapping: Array<number>): void;

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
     * available stripTypes
     */
    STRIP_TYPES: {
        WS2812_STRIP: 0,
        SK6812_STRIP: 1,
        SK6812W_STRIP: 2,
    };

    /**
     * Map generators
     */
    indexMapping: {
        alternatingMatrix(width: number, height: number): Uint16Array;
        mirrorMatrixX(width: number, height: number): Uint16Array;
    };
}

export = new ws281x();