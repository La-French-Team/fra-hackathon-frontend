"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Layer, Source } from "react-map-gl";

import { Slider } from "@mui/material";
import { createRef, useContext, useEffect, useState } from "react";

import { MapContext } from "../MapContext";
import floorSource from "./airport-source";
import { extrusionLayer, flatLayer } from "./data-layer";
import museumSource from "./museum-source";

const valuetext = (value) => {
  return `${value} / 10`;
};

const Map = ({}) => {
  const parentRef = createRef();
  const [mapStyle, setMapStyle] = useState({ width: 800, height: 600 });
  const { mapboxAccessToken } = useContext(MapContext);

  useEffect(() => {
    setMapStyle({
      width: parentRef.innerWidth,
      height: parentRef.innerHeight || window.innerHeight * 0.6,
    });
  }, [parentRef.innerHeight, parentRef.innerWidth]);

  return (
    <div>
      <div ref={parentRef}>
        <MapGL
          initialViewState={{
            longitude: 8.553247617024397,
            latitude: 50.03429893352305,
            zoom: 14,
          }}
          style={mapStyle}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mapboxAccessToken}
          antialias={true}
        >
          <Source type="geojson" data={museumSource}>
            <Layer {...extrusionLayer} />
          </Source>
        </MapGL>
      </div>
      <Slider
        aria-label="Step"
        defaultValue={1}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        step={1}
        marks
        min={1}
        max={10}
      />
    </div>
  );
};

export default Map;
