import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';

const StepFinal = () => {

 return (
    <div class="card text-center">
    <div class="card-body">
        <Player  src='https://assets2.lottiefiles.com/packages/lf20_s2lryxtd.json' style={{width: 300}} className="player" loop autoplay />
    </div>
  </div>
  );
}
 
export default StepFinal;