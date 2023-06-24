import { useEffect, useState } from "react"
import { lineAnimationLayer, lineLayer } from "./data-layer"
import { Layer, Source } from "react-map-gl";
import steps from "./steps";


export default ({ data, isPlaying, step = 0, onMove }) => {
  const [path, setPath] = useState(null);

  const setPathToStep = (step = 0) => {
    const tmp = JSON.parse(JSON.stringify(data));
    tmp.features[0].geometry.coordinates =
      data.features[0].geometry.coordinates.slice(0, step);
    if (step > 0) {
      onMove(tmp.features[0].geometry.coordinates[tmp.features[0].geometry.coordinates.length - 1], step)
    }
    setPath(tmp)
  }

  useEffect(() => {
    setPathToStep(steps[step].start)
  }, [])

  const playNextStep = () => {
    let newStep = path.features[0].geometry.coordinates.length + 1
    if (newStep <= steps[step].end) {
      setPathToStep(newStep)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      setTimeout(playNextStep, steps[step].interval)
    }
  }, [isPlaying, path])

  return <>
    <Source type="geojson" data={data}>
      <Layer {...lineLayer} />
    </Source>
    <Source type="geojson" data={path}>
      <Layer {...lineAnimationLayer} />
    </Source>
  </>
}