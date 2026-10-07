// src/data/cities.ts
// Aerial LiDAR point clouds shown on the homepage. Each file in /public/cities/ is:
//   uint32 header length, JSON header { count, min, max }, then
//   count x 3 uint16 positions (quantized between min and max, metres), then
//   count x uint8 return intensity rank, then
//   count x uint8 height above ground (metres).
// Points are stored in random order, so drawing the first N gives an even sample.
//
// Sources (not shown on the page):
//   London: Environment Agency National LIDAR Programme, 2020. Contains public sector
//           information licensed under the Open Government Licence v3.0.
//   Boston: U.S. Geological Survey 3D Elevation Program, 2021. Public domain.

export interface City {
  id: 'london' | 'boston';
  label: string;
  timeZone: string;
  file: string;
  /** Camera heading in radians; 0 looks north from the south. */
  heading: number;
  /** Point the camera orbits, in metres from the centre of the tile (east, north). */
  focus: [number, number];
}

export const cities: City[] = [
  {
    id: 'london',
    label: 'London',
    timeZone: 'Europe/London',
    file: '/cities/london.bin',
    heading: -0.55,
    focus: [-120, 120],
  },
  {
    id: 'boston',
    label: 'Boston',
    timeZone: 'America/New_York',
    file: '/cities/boston.bin',
    heading: -0.6,
    focus: [0, 0],
  },
];
