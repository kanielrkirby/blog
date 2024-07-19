const duration = "0.2s";

const anim = {
  old: {
    name: "customFadeOut",
    // delay: ,
    duration,
    easing: "linear",
    fillMode: "forwards",
    // direction: ,
  },
  new: {
    name: "customFadeIn",
    // delay: ,
    duration,
    easing: "linear",
    fillMode: "backwards",
    // direction: ,
  },
};

const downAnim = {
  old: {
    name: "customFadeOut",
    // delay: ,
    duration,
    easing: "linear",
    fillMode: "forwards",
    // direction: ,
  },
  new: {
    name: "customFadeOutIn",
    // delay: ,
    duration,
    easing: "linear",
    fillMode: "backwards",
    // direction: ,
  },
};

export const myFade = {
  forwards: anim,
  backwards: anim,
};

export const myDownFade = {
  forwards: downAnim,
  backwards: downAnim,
};
