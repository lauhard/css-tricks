import gsap from "gsap";
import type { Attachment } from "svelte/attachments";
import { SplitText } from "gsap/SplitText";
import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { browser } from "$app/environment";

/********************** GSAP PLUGINS ******************/

let devTool = $state<GSDevTools | null | undefined>();
if (browser) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.registerPlugin(SplitText);
}
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
}
export type Animation = {
    id: string;
    tween?: gsap.core.Tween;
    timeline?: gsap.core.Timeline;
    name?: string;
};
export type AnimationStore = {
    animation: Record<string, Animation>;
};



//iterate over tweens
const tweenIterate = (tweens: Tween[] | undefined, element: Element | Element[], animations: AnimationStore) => {
    if (!tweens) return;
    for (const tween of tweens || []) {
        const target = tween.targets
            ? (tween.targets as Element | Element[])
            : element;
        let animation = gsapTween(target, tween) as ReturnType<
            typeof gsapTween
        >;
        // register animatiton
        let id = crypto.randomUUID();
        let index = id.toString();
        if (tween.name)
            index = tween.name;

        if (animation)
            animations.animation[index] = {
                id: id,
                name: tween.name,
                tween: animation,
            };
    }
}

// timeline iterate
const timelineIterate = (tl: gsap.core.Timeline, tweens: Tween[] | undefined, element: Element | Element[], animations: AnimationStore) => {
    if (!tweens) return;
    for (const tween of tweens || []) {
        const target = tween.targets
            ? (tween.targets as Element | Element[])
            : element;
        let timeline = gsapTimeline(tl, target, tween) as ReturnType<
            typeof gsapTimeline
        >;
        // register animatiton
        let id = crypto.randomUUID();
        let index = id.toString();
        if (tween.name)
            index = tween.name;

        if (timeline)
            animations.animation[index] = {
                id: id,
                name: tween.name,
                timeline: timeline,
            };
    }
}

//animation cleanup
const animationCleanup = (animations: AnimationStore) => {
    Object.entries(animations.animation).forEach(([index, entry]) => {
        const target = entry.timeline ?? entry.tween;
        target?.revert();
        target?.kill();
        console.log(
            "animation cleanup", animations.animation?.[index]?.name || index
        );
        delete animations.animation?.[index];
    })
}

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

export const startDevTools = (config: GSDevTools.Vars) => {
    gsap.registerPlugin(GSDevTools);
    devTool = null;
    devTool = GSDevTools.create({
        ...config,
    });
    console.log("gsap DevTools started", devTool);
    return devTool;
}
export const killDevTools = () => {
    if (devTool) {
        devTool.kill();
        devTool = null;
        console.log("gsap DevTools killed");
    }
}

export const killScrollTrigger = () => {
    ScrollTrigger.getAll().forEach((st) => {
        st.kill();
    });
    console.log("ScrollTriggers killed");
}


export const useGsap = () => {
    let animations = $state<AnimationStore>({ animation: {} });
    let devTool = $state<GSDevTools | null>(null);
    $effect(() => {
        return () => {
            killScrollTrigger();
        };
    })
    return {
        animationStore() {
            return animations;
        },
        getAnimation(name: string) {
            return animations.animation[name];
        },
        unregisterAnimation(name: string, config?: { atTime: number | string, suppressEvents?: boolean }) {
            const entry = animations.animation[name];
            if (!entry) return;

            const target = entry.tween ?? entry.timeline;
            if (!target) return;

            if (target.time() === 0) {
                target.kill();
                delete animations.animation[name];
                return;
            }

            // Clear any previous reverse-complete callback to avoid stacking
            target.eventCallback("onReverseComplete", null);

            // wait for revert animation to be finished
            target.eventCallback("onReverseComplete", () => {
                target.kill();
                delete animations.animation[name];
                console.log("onReverseComplete", "completed");
            });

            target.reverse(config?.atTime, config?.suppressEvents);
        },
        startDevTools(config: GSDevTools.Vars) {
            gsap.registerPlugin(GSDevTools);
            devTool = null;
            devTool = GSDevTools.create({
                ...config,
            });
        },
        killDevTools() {
            if (devTool) {
                devTool.kill();
                devTool = null;
                console.log("gsap DevTools killed");
            }
        },
        splitText(splitOptions: Split): Attachment {
            return (element: Element) => {
                if (!browser) return;
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
        tween(tweenOptions: Tween[], scoped = true): Attachment {
            return (element: Element | Element[]) => {
                if (!browser) return;
                if (!tweenOptions) return;
                if (tweenOptions.length === 0) return;
                let context: gsap.Context | null = null;
                if (scoped) {
                    context = gsap.context(() => {
                        tweenIterate(tweenOptions, element, animations);
                    }, element);
                } else {
                    tweenIterate(tweenOptions, element, animations);
                }
                console.log("context tween", context);
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
        timeline(timelineOptions: Timeline, scoped = true): Attachment {
            return (element: Element | Element[]) => {
                if (!browser) return;
                if (!timelineOptions || !timelineOptions?.tweens) return;
                //if (timelineOptions?.tweens.length === 0) return;
                const timelineVars = timelineOptions?.vars || undefined;
                const tl = gsap.timeline(timelineVars);
                let context: gsap.Context | null = null;
                if (scoped) {
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
                    animations.animation[index] = {
                        id: id,
                        name: timelineOptions.name,
                        timeline: tl,
                    }
                }
                console.log("context timeline " + (timelineOptions?.name || index), context);
                return () => {
                    tl.eventCallback("onReverseComplete", () => {
                        console.log("timeline onReverseComplete", "completed");
                        animationCleanup(animations);
                        tl.clear(true);
                        tl.kill();
                        if (context) {
                            context.revert();
                            context.clear();
                            context.kill();
                        }
                    });
                    tl.reverse();
                    tl.autoRemoveChildren = true;
                };
            };
        },

        //calll specific animation
        restart(entry: Animation) {
            const target = entry?.tween ?? entry?.timeline;
            target?.restart(true, false);
        },
        play(entry: Animation) {
            const target = entry?.tween ?? entry?.timeline;
            target?.play();
        },
        pause(entry: Animation) {
            const target = entry?.tween ?? entry?.timeline;
            target?.pause();
        }

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
