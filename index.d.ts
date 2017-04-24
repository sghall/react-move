import * as React from "react";

interface EasingFunction {
    (progress: number): number;
}
export interface IAnimateProps {
    /**
     * An object of keys that that you wish to animate. 
     * When these values are changed, each and every value in this object will be 
     * interpolated (unless its key is found in the ignore prop)
     */
    data: {};

    /**
     * An object of keys to be used as the initial state of the animation.
     */
    default?: {};

    /**
     * The duration in milliseconds for each item to animate
     * Default: 500
     */
    duration?: number;

    /**
     * A string that references a d3-ease function, 
     * or a custom easing function that receives a progress decimal 
     * and returns a new progress decimal.
     * Default: 'easeCubicOut'
     */
    easing?: string | EasingFunction;

    /**
     * Any keys found in this array will not be interpolated, 
     * and instead will be immediately set to the new value
     * Default: false
     */
    ignore?: Array<string>;

    /**
     * Avoid dropping frames at all cost by 
     * dynamically increasing the duration of the animation loop becomes overwhelmed.
     * Default: false
     */
    flexDuration?: boolean;

    /**
     * By default, strict equality === between the old data and new data is used to detect when an animation should occur. 
     * If you wish, you can disable immutable mode which falls back to using JSON.stringify to determine if an animation should occur.
     * Default: true
     */
    immutable?: boolean;
}
export declare class Animate extends React.Component<IAnimateProps, {}> {
    static defaultProps: IAnimateProps;
}

export interface ITransitionProps {
    /**
     * An array of objects you wish to track. 
     * These are not necessarily the exact values you wish to animate, 
     * but will used to produce the animated values.
     */
    data: Array<{}>;
    /**
     * A function that returns a unique identifier for each item. 
     * This is used to track enter, update and leave states/groups.
     */
    getKey?: (item: any, index: number | string) => number | string;
    /**
     * A function that returns the state for an item if it is neither entering or leaving the list of items.
     */
    update: (item: any) => any;
    /**
     * A function that returns the state for an item if it is entering the list of items. 
     * If nothing is returned, the update state is used.
     */
    enter?: (item: any) => any;
    /**
     * A function that returns the state for an item if it is leaving the list of items. 
     * If nothing is returned, the update state is used.
     */
    leave?: (item: any) => any;
    /**
     * The duration in milliseconds for each item to animate
     */
    duration?: number;
    /**
     * A string that references a d3-ease function, or a custom easing function 
     * that receives a progress decimal and returns a new progress decimal.
     */
    easing?: string | EasingFunction;
    /**
     * Number of milliseconds for each item to wait relative to it's preceding item.
     */
    stagger?: number;
    /**
     * Delays item animation relative to status groups instead of the entire list. 
     * The relative groups used in this mode are entering, updating and leaving.
     */
    staggerGroups?: boolean;
    /**
     * Any keys found in this array will not be interpolated, 
     * and instead will be immediately set to the new value
     */
    ignore?: Array<string>;
    /**
     * Avoid dropping frames at all cost by dynamically 
     * increasing the duration of the animation loop becomes overwhelmed.
     */
    flexDuration?: boolean;
}
export declare class Transition extends React.Component<ITransitionProps, {}> {
    static defaultProps: ITransitionProps;
}