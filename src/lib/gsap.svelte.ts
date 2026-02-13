import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import type { Attachment } from "svelte/attachments";

/********************** GSAP PLUGINS ******************/

gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(SplitText);

export { gsap, GSDevTools };

export const gsapTween = (
    element?: Node | Element[] | Element | HTMLElement,
    options?: Tween,
): gsap.core.Tween | null => {
    if (element && options) {
        if (options?.from && options?.to) {
            return gsap.fromTo(element, options.from, options.to);
        }
        else if (options?.from) {
            return gsap.from(element, options.from);
        }
        else if (options?.to) {
            return gsap.to(element, options.to);
        }
        else {
            return null;
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
        if (options?.from && options?.to) {
            return tl.fromTo(element, options.from, options.to, options.position);
        }
        else if (options?.from) {
            return tl.from(element, options.from, options.position);
        }
        else if (options?.to) {
            return tl.to(element, options.to, options.position);
        }
        else {
            return null;
        }
    } else {
        return null;
    }
};


export type Tween = {
    name?: string,
    targets?: gsap.TweenTarget;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    position?: gsap.Position;
}
export type Timeline = {
    name?: string;
    vars?: gsap.TimelineVars;
    tweens: Tween[];
}

export type Split = {
    target?: string;
    vars: SplitText.Vars;
    targetType: "chars" | "words";
}

export type GsapOptions = {
    // method?: "from" | "to" | "fromTo" | "timeline";
    tweens?: Tween[],
    timeline?: Timeline,
    split?: Split;
};

export type AnimationStore = {
    id: string;
    animation?: any;
    timeline?: any;
    name?: string;
};

export type TimlineStore = {
    id: string;
    timeline: any;
    name?: string;
};

//iterate over tweens
const tweenIterate = (tweens: Tween[] | undefined, element: Element | Element[], animations: Record<string, AnimationStore>) => {
    if (!tweens) return;
    for (const tween of tweens || []) {
        if (tween?.targets) {
            element = tween.targets as Element | Element[];
        }
        let animation = gsapTween(element, tween) as ReturnType<
            typeof gsapTween
        >;
        // register animatiton
        let id = crypto.randomUUID();
        let index = id.toString();
        if (tween.name)
            index = tween.name;
       
        animations[index] = {
            id: id, //not needed...
            name: tween.name,
            animation: animation,
        };
    }
}

// timeline iterate
const timelineIterate = (tl: gsap.core.Timeline, tweens: Tween[] | undefined, element: Element | Element[], animations: Record<string, AnimationStore>) => {
    if (!tweens) return;
    for (const tween of tweens || []) {
        if (tween?.targets) {
            element = tween.targets as Element | Element[];

        }
        let timeline = gsapTimeline(tl, element, tween) as ReturnType<
            typeof gsapTimeline
        >;
        // register animatiton
        let id = crypto.randomUUID();
        let index = id.toString();
        if (tween.name)
            index = tween.name;
       
        animations[index] = {
            id: id, //not needed...
            name: tween.name,
            timeline: timeline,
        };
    }
}

//animation cleanup
const animationCleanup = (animations: Record<string, AnimationStore>) => {
    Object.entries(animations).forEach(([index, tween]) => {
        animations[index]?.animation?.revert();
        animations[index]?.animation?.kill();
        console.log(
            "animation cleanup",animations?.[index]?.name || index
        );
        delete animations?.[index];
    })
}

//timeline cleanup
const timelineCleanup = (animations: Record<string, AnimationStore>) => {
    Object.entries(animations).forEach(([index, timeline]) => {
        animations[index]?.timeline?.revert();
        animations[index]?.timeline?.kill();
        console.log(
            "timeline cleanup",animations?.[index]?.name || index
        );
        delete animations?.[index];
    })
}

export const useGsap = () => {
    let animations = $state<Record<string, AnimationStore>>({});
    return {
        animationStore() {
            return animations;
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
                console.log("onReverseComplete", "completed");
            });

            animation.reverse(2, false);
        },
        splitText(splitOptions: Split): Attachment {
            return (element: Element) => {
                //write a fuction that splits classes and ignores classes that starts with "s-"
                const classes = element.className.split(" ").filter((c) => !c.startsWith("s-"));
                if (!splitOptions.target && classes.length === 0) return;
                let splitClass: string | null = null;
                if (classes.length > 0)
                    splitClass = `.${classes[0]}` as string;
                if (splitOptions?.target) {
                    splitClass = splitOptions.target;
                }
                console.log("splitElement", splitClass);
                let split = SplitText.create(splitClass, {
                    ...splitOptions.vars,
                });
                return () => {
                    split.revert();
                }
            }
        },
        tween(tweenOptions: Tween[], ctx = true): Attachment {
            return (element: Element | Element[]) => {
                if (!tweenOptions) return;
                if (tweenOptions.length === 0) return;
                let context: gsap.Context | null = null;
                if (ctx) {
                    context = gsap.context(() => {
                        tweenIterate(tweenOptions, element, animations);
                    }, element);
                } else {
                    tweenIterate(tweenOptions, element, animations);
                }
                console.log("context tween", ctx);
                return () => {
                    if (context) {
                        context.revert();
                        context.clear();
                        context.kill();
                    }
                    animationCleanup(animations);
                };
            };
        },
        timeline(timelineOptions: Timeline, ctx = true): Attachment {
            return (element: Element | Element[]) => {
                if (!timelineOptions || !timelineOptions?.tweens) return;
                if (timelineOptions?.tweens.length === 0) return;
                const timelineVars = timelineOptions?.vars || {};
                const tl = gsap.timeline(timelineVars);
                let context: gsap.Context | null = null;
                if (ctx) {
                    context = gsap.context(() => {
                        timelineIterate(tl, timelineOptions.tweens, element, animations);
                    }, element);
                } else {
                    timelineIterate(tl, timelineOptions.tweens, element, animations);
                }
                let id = crypto.randomUUID();
                let index = id.toString();  
                if (timelineOptions?.name) {
                    index = timelineOptions.name;
                    animations[index] = {
                        id: id,
                        name: timelineOptions.name,
                        timeline: tl,
                    }
                }
                console.log("context timeline"+(timelineOptions?.name || index), ctx);
                return () => {
                    if (context) {
                        context.revert();
                        context.clear();
                        context.kill();
                    }
                    tl.reverse();
                    tl.autoRemoveChildren = true;
                    tl.eventCallback("onReverseComplete", () => {
                        console.log("timeline onReverseComplete", "completed");
                        tl.clear();
                        tl.kill();
                    });
                    //timelineCleanup(animations);
                };
            };
        },

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

/**************************** reference for tween callbacks ****************************/

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
