import L from 'leaflet';
// import { Icon } from '../../components';
// import ReactDOMServer from 'react-dom/server';

import TrackingSpotImg from '../../assets/images/TrackingSpot.svg';
import TrackingBg from '../../assets/images/trackingBg.png';
import BusStopImg from '../../assets/images/BusStop.png';
import BusStopActiveImg from '../../assets/images/BusStop_active.png';

const GPS_ICON = new L.icon({
  iconUrl: TrackingSpotImg,
  iconAnchor: null,
  iconSize: [32, 32],
  shadowUrl: TrackingBg,
  shadowSize: [300, 300],
});

const BusMarkerIcon = new L.icon({
  iconUrl: BusStopImg,
  iconAnchor: null,
  iconSize: [41, 49],
});

const BusActiveIcon = new L.icon({
  iconUrl: BusStopActiveImg,
  iconAnchor: null,
  iconSize: [41, 49],
});

// const generateMarkerIcon = quantity =>
//   L.divIcon({
//     iconSize: [58, 73],
//     iconAnchor: [22.5, 30],
//     popupAnchor: [5, -30],
//     className: 'custom-icon',
//     html: ReactDOMServer.renderToString(<MarkerIcon quantity={quantity} />),
//   });

export { GPS_ICON, BusMarkerIcon, BusActiveIcon };
