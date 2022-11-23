import Map from "ol/Map";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { useRef, useEffect } from "react";
import "./map.css";
import Title from "@/layouts/Title";

export default function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    // destroy the map if it already exists

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 4,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div ref={mapRef} className="h-screen w-screen fixed top-0 left-0">
      <Title>Map - WebGIS Intellegence</Title>
    </div>
  );
}
