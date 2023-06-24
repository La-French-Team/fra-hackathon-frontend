import { BrowserView, MobileView } from "react-device-detect"
import { MapContext } from "../MapContext";
import Map from "../Map";
import { useEffect, useState } from "react";

const getSize = () => ({
  width: window.innerHeight * 0.8 * 9 / 16,
  height: window.innerHeight * 0.8
})

export default ({ mapboxAccessToken }) => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(getSize())
    })
  }, [])

  console.log(size)

  return <>
    <BrowserView>
      <div style={{
        width: size.width,
        height: size.height,
        margin: "1rem auto 0 auto",
        padding: "2rem 3rem 4rem 2rem",
        background: "url(/smartphone.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
      }} >
        <MapContext.Provider value={{ mapboxAccessToken }}>
          <Map />
        </MapContext.Provider>
      </div>
    </BrowserView>
    <MobileView>
      <MapContext.Provider value={{ mapboxAccessToken }}>
        <Map />
      </MapContext.Provider>
    </MobileView>
  </>
}