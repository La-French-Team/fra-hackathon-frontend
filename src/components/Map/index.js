"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Layer, Marker, Source } from "react-map-gl";

import { Button, MobileStepper } from "@mui/material";
import { useContext, useState } from "react";

import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import useResizeObserver from "use-resize-observer";
import { MapContext } from "../MapContext";
import DropoffDialog from "./DropoffDialog";
import PathSource from "./PathSource";
import PickupDialog from "./PickupDialog";
import airportSource from "./airport-source";
import { flatLayer } from "./data-layer";
import lineSource from "./line-source";
import steps from "./steps";

const Map = ({}) => {
  const router = useRouter();
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const { mapboxAccessToken } = useContext(MapContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPickupDialogOpen, setDialogPickUpOpened] = useState(false);
  const [isDropoffDialogOpen, setDialogDropOffOpened] = useState(false);
  const [activeStep, setActiveStep] = useState(router.query.step);
  const [currentPos, setCurrentPos] = useState(
    lineSource.features[0].geometry.coordinates[steps[router.query.step].start]
  );

  const theme = useTheme();

  const animateLine = (state) => () => {
    setIsPlaying(state);
  };

  const onMove = (pos, step) => {
    setCurrentPos(pos);
    if (step === steps[router.query.step].end) {
      setIsPlaying(false);
      if (steps[router.query.step].isPickUp) {
        setDialogPickUpOpened(true);
      } else if (steps[router.query.step].isDropOff) {
        setDialogDropOffOpened(true);
      }
    }
  };

  const onPickup = () => {
    setDialogPickUpOpened(false);
    setActiveStep(1);
    enqueueSnackbar("ULD picked up", { variant: "success" });
  };

  const onDropOff = () => {
    enqueueSnackbar("ULD dropped off", { variant: "success" });
  };

  return (
    <>
      <PickupDialog open={isPickupDialogOpen} onClose={onPickup} />
      <DropoffDialog open={isDropoffDialogOpen} onClose={onDropOff} />
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        <MapGL
          initialViewState={{
            longitude: 8.556629344403035,
            latitude: 50.027697101405664,
            zoom: 15,
          }}
          style={{
            width,
            height,
          }}
          mapStyle={
            theme.palette.mode === "dark"
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/streets-v12"
          }
          mapboxAccessToken={mapboxAccessToken}
          antialias={true}
        >
          <Source type="geojson" data={airportSource}>
            <Layer {...flatLayer} />
          </Source>
          <PathSource
            data={lineSource}
            isPlaying={isPlaying}
            step={activeStep}
            onMove={onMove}
          />
          {currentPos && (
            <Marker
              color="red"
              latitude={currentPos[1]}
              longitude={currentPos[0]}
            ></Marker>
          )}
        </MapGL>
      </div>

      <MobileStepper
        variant="dots"
        steps={steps.length + 1}
        position="static"
        activeStep={parseInt(activeStep)}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={animateLine(true)}
            disabled={activeStep >= steps.length || isPlaying}
          >
            {steps[router.query.step].nextStepLabel}
          </Button>
        }
      />
    </>
  );
};

export default Map;
