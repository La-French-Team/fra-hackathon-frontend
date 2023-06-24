import { BrowserView, MobileView } from "react-device-detect"
import { useEffect, useState } from "react";

const getSize = () => ({
  width: window.innerHeight * 0.82 * 9 / 18,
  height: window.innerHeight * 0.80
})

export default ({ children }) => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(getSize())
    })
  }, [])

  return <>
    <BrowserView>
      <div style={{
        width: size.width,
        height: size.height,
        margin: "1rem auto 0 auto",
        padding: "2rem 2rem 4rem 2rem",
        background: "url(/smartphone-2.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f3f2f1",
        borderRadius: "10%"
      }} >
        {children}
      </div>
    </BrowserView>
    <MobileView>
      <div style={{
        width: "100vw",
        height: "calc(100vh - 64px)",
        padding: "0.5rem",
        marginBottom: "0.5rem"
      }} >
        {children}
      </div>
    </MobileView>
  </>
}