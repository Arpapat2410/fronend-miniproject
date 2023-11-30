import { useLottie } from "lottie-react";

const style = {
  height: 400,
};

function Loading({ animation }) {
  const options = {
    animationData: animation.default,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Loading;