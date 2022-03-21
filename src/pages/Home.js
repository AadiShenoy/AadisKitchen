import HeroSection from "../components/HeroSection";
import ChiefsSection from "../components/ChiefsSection";
import Slider from '../components/Slider'
export default function Home({recipe}) {
  return (
    <div>
      <HeroSection />
      <Slider recipe={recipe}/>
      <ChiefsSection />
    </div>
  );
}
