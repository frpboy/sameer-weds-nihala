import AmbientGlow from './AmbientGlow';
import FloatingParticles from './FloatingParticles';
import MouseTrail from './MouseTrail';
import ParallaxLayer from './ParallaxLayer';
import FilmGrain from './FilmGrain';

export default function AmbientEffects() {
  return (
    <>
      <FilmGrain />
      <AmbientGlow />
      <ParallaxLayer />
      <FloatingParticles />
      <MouseTrail />
    </>
  );
}
