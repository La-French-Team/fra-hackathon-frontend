"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Layer, Source } from "react-map-gl";

import { Slider } from "@mui/material";
import { createRef, useContext, useEffect, useState } from "react";

import { MapContext } from "../MapContext";
import { extrusionLayer, flatLayer } from "./data-layer";
import museumSource from "./museum-source";
import useResizeObserver from "use-resize-observer";
import airportSource from "./airport-source";

const valuetext = (value) => {
  return `${value} / 10`;
};

const Map = ({ }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const { mapboxAccessToken } = useContext(MapContext);

  return (
    <>
      <div ref={ref} 
          style={{
            width: "100%",
            height: "90%"
          }}>
        <MapGL
          initialViewState={{
            longitude: 8.553247617024397,
            latitude: 50.03429893352305,
            zoom: 12,
          }}
          style={{
            width,
            height
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mapboxAccessToken}
          antialias={true}
        >
          <Source type="geojson" data={airportSource}>
            <Layer {...flatLayer} />
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
    </>
  );
};

export default Map;
