import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import type { Attachment } from "svelte/attachments";

/********************** GSAP PLUGINS ******************/
gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

export { gsap, GSDevTools };

export const gsapTween = (
    element?: Node | Element[] | Element | HTMLElement,
    options?: Tween,
): gsap.core.Tween | null => {
    if (element && options) {
        switch (options?.method) {
            case "from":
                return options.from
                    ? gsap.from(element, options.from)
                    : null;
            case "to":
                return options.to ? gsap.to(element, options.to) : null;
            case "fromTo":
                return options.from && options.to
                    ? gsap.fromTo(element, options.from, options.to)
                    : null;
            default:
                return options.from
                    ? gsap.from(element, options.from)
                    : null;
        }
    } else {
        return null;
    }
};
export const gsapTimeline = (
    tl: gsap.core.Timeline,
    element?: Node | Element[] | Element | HTMLElement,
    options?: Tween,
): gsap.core.Timeline | null => {
    if (element && options) {
        switch (options?.method) {
            case "from":
                return options.from
                    ? tl.from(element, options.from, options.position)
                    : null;
            case "to":
                return options.to ? tl.to(element, options.to, options.position) : null;
            case "fromTo":
                return options.from && options.to
                    ? tl.fromTo(element, options.from, options.to, options.position)
                    : null;
            default:
                return options.from
                    ? tl.from(element, options.from, options.position)
                    : null;
        }
    } else {
        return null;
    }
};



export const tl = gsap.timeline();
// export const gsapTimeline = (
//     element?: Node | Element[] | Element | HTMLElement,
//     options?: GsapOptions,
// ): gsap.core.Timeline | null => {
//     if (element && options) {
//         switch (options?.method) {
//             case "from":
//                 return options.from ? tl.from(element, options.from) : null;
//             case "to":
//                 return options.to ? tl.to(element, options.to) : null;
//             case "fromTo":
//                 return options.from && options.to
//                     ? tl.fromTo(element, options.from, options.to)
//                     : null;
//             default:
//                 return options.from ? tl.from(element, options.from) : null;
//         }
//     } else {
//         return null;
//     }
// };
export type Tween = {
    name?: string,
    targets?: gsap.TweenTarget;
    method?: "from" | "to" | "fromTo"
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    position?: gsap.Position;
}


export type GsapOptions = {
    // method?: "from" | "to" | "fromTo" | "timeline";
    tweens?: Tween[],
    timeline?: {
        name?: string;
        vars?: gsap.TimelineVars;
        tweens?: Tween[],
    },
    split?: {
        target: string;
        vars: SplitText.Vars;
        targetType: "chars" | "words";
    };
};



export type AnimationStore = {
    id: string;
    animation: any;
    name?: string;
};

export type TimlineStore = {
    id: string;
    timeline: any;
    name?: string;
};



export const useGsap = () => {
    let animations = $state<Record<string, AnimationStore>>({});
    let timelines = $state<Record<string, TimlineStore>>({});
    return {
        animationStore() {
            return animations;
        },
        timelineStore() {
            return timelines;
        },
        unregisterAnimation(name: string) {
            const entry = animations[name];
            if (!entry) return;

            const { animation } = entry;

            // if on start -> kill
            if (animation.time() === 0) {
                animation.kill();
                delete animations[name];
                return;
            }

            // Clear any previous reverse-complete callback to avoid stacking
            animation.eventCallback("onReverseComplete", null);

            // wait for revert animation to be finished
            animation.eventCallback("onReverseComplete", () => {
                animation.kill();
                delete animations[name];
                console.log("animations", animations);
            });

            animation.reverse(2, false);
        },
        splitText(options: GsapOptions): Attachment {
            return (element: Element) => {
                //write a fuction that splits classes and ignores classes that starts with "s-"
                const classes = element.className.split(" ").filter((c) => !c.startsWith("s-"));
                if (!options.split || classes.length === 0) return;
                let splitClass = classes[0];
                if (options.split?.target) {
                    splitClass = options.split.target;
                }
                console.log("splitElement", splitClass);
                let split = SplitText.create(splitClass, {
                    ...options.split.vars,
                });
                return () => {
                    split.revert();
                }
            }
        },
        tween(options: GsapOptions): Attachment {
            return (element: Element | Element[]) => {
                if (!options?.tweens) return;
                if (options.tweens.length === 0) return;
                for (const tween of options.tweens) {
                    if (tween?.targets) {
                        element = tween.targets as Element | Element[];
                        console.log("targets", element);
                    }

                    let animation = gsapTween(element, tween) as ReturnType<
                        typeof gsapTween
                    >;
                    // register animatiton
                    let id;
                    if (!tween.name)
                        id = crypto.randomUUID();
                    else
                        id = tween.name;
                    animations[id] = {
                        id: id, //not needed...
                        name: tween.name,
                        animation: animation,
                    };
                }

                return () => {
                    Object.entries(animations).forEach(([id, tween]) => {
                        animations[id]?.animation.kill();
                        animations[id]?.animation.revert();
                        console.log(
                            "animation cleanup",
                            animations[id]?.name,
                        );
                        delete animations[id];
                    })
                    //animation = (animation as gsap.core.Tween)?.reverse(1);
                    //animation = null;
                    //if (!options?.tween) return;
                    //if (options.tween.name) {
                    //console.log(
                    //    "animation cleanup",
                    //    animations[options.tween?.name]?.name,
                    //);
                    //    animations[options.tween?.name]?.animation.kill();
                    //    animations[options.tween?.name]?.animation.revert();
                    //    delete animations[options.tween?.name];
                    //}
                };
            };
        },
        timeline(options: GsapOptions): Attachment {
            return (element: Element | Element[]) => {
                if (!options?.timeline || !options?.timeline?.tweens) return;
                if (options?.timeline?.tweens.length === 0) return;
                const timelineVars = options.timeline?.vars || {};
                const tl = gsap.timeline(timelineVars);
                if (options.timeline?.name) {
                    const id = crypto.randomUUID();
                    timelines[options.timeline.name] = {
                        id: id,
                        name: options.timeline.name,
                        timeline: tl,
                    }
                }
                for (const tween of options.timeline?.tweens) {
                    if (tween?.targets) {
                        element = tween.targets as Element | Element[];
                        console.log("targets", element);
                    }


                    let animation = gsapTimeline(tl, element, tween) as ReturnType<
                        typeof gsapTimeline
                    >;
                    // register animatiton
                    let id;
                    if (!tween.name)
                        id = crypto.randomUUID();
                    else
                        id = tween.name;
                    animations[id] = {
                        id: id, //not needed...
                        name: tween.name,
                        animation: animation,
                    };
                }

                return () => {
                    Object.entries(animations).forEach(([id, tween]) => {
                        animations[id]?.animation.kill();
                        animations[id]?.animation.revert();
                        console.log(
                            "animation cleanup",
                            animations[id]?.name,
                        );
                        delete animations[id];
                    })
                    //animation = (animation as gsap.core.Tween)?.reverse(1);
                    //animation = null;
                    //if (!options?.tween) return;
                    //if (options.tween.name) {
                    //console.log(
                    //    "animation cleanup",
                    //    animations[options.tween?.name]?.name,
                    //);
                    //    animations[options.tween?.name]?.animation.kill();
                    //    animations[options.tween?.name]?.animation.revert();
                    //    delete animations[options.tween?.name];
                    //}
                };
            };
        },
        // timeline(options: GsapOptions): Attachment {
        //     return (element: Element | Element[]) => {

        //         if (options.targets) {
        //             element = options.targets as Element;
        //         }
        //         let animation = gsapTimeline(
        //             element,
        //             options,
        //         ) as ReturnType<typeof gsapTimeline>;
        //         // register animatiton
        //         const id = crypto.randomUUID();
        //         animations[options.name] = {
        //             id: id, //not needed...
        //             name: options.name,
        //             animation: animation,
        //         };
        //         return () => {
        //             // not needed svelte can handle the cleanup via signals.
        //             // Object.entries(animations).forEach((a)=>{
        //             //    console.log("animation", a);
        //             //})
        //             //animation = (animation as gsap.core.Tween)?.reverse(1);
        //             //animation = null;

        //             console.log(
        //                 "animation cleanup",
        //                 animations[options.name]?.name,
        //             );
        //             animations[options.name]?.animation.kill();
        //             animations[options.name]?.animation.revert();
        //             delete animations[options.name];
        //         };
        //     };
        // },
        //calll specific animation
        restart(entry: AnimationStore) {
            if (entry) entry.animation?.restart(true, false);
        },
        play(entry: AnimationStore) {
            if (entry) entry.animation?.play();
        },
        pause(entry: AnimationStore) {
            if (entry) entry.animation?.pause();
        },
    };
};


//const tweenRepeat = function (
//    this: gsap.core.Tween,
//    param1: string,
//    param2: string,
//) {
//    const el = this.targets()[0] as HTMLElement;
//
//    // Example: read current transform-y and opacity from the live element
//    const y = gsap.getProperty(el, "y"); // number
//    const opacity = gsap.getProperty(el, "opacity"); // number
//
//    console.log("teenRepeat", param1, param2, {
//        progress: this.progress(),
//        y,
//        opacity,
//    });
//};
