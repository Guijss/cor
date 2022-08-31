import WheelMono from '../components/WheelMono';
import WheelAnalog from '../components/WheelAnalog';
import WheelComp from '../components/WheelComp';
import WheelTriad from '../components/WheelTriad';
import WheelSplit from '../components/WheelSplit';
import WheelTetra from '../components/WheelTetra';

const schemes = [
  { name: 'Monochromatic', component: WheelMono, ranges: [0] },
  { name: 'Analogous', component: WheelAnalog, ranges: [11, 0, 1] },
  { name: 'Complementary', component: WheelComp, ranges: [0, 6] },
  { name: 'Triad', component: WheelTriad, ranges: [0, 4, 8] },
  {
    name: 'Split-Complementary',
    component: WheelSplit,
    ranges: [11, 0, 1, 5, 6, 7],
  },
  { name: 'Tetradic', component: WheelTetra, ranges: [0, 3, 6, 9] },
];

export default schemes;
