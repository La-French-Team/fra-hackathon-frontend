import React from 'react';
import { minWidthToDisplayText, textHeight } from './constants';


const LabeledRect = ({
  backgroundColor,
  color,
  disableDefaultTooltips,
  height,
  isDimmed = false,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  tooltip,
  width,
  x,
  y,
}) => (
  <g
    className="flame-g"
    transform={`translate(${x},${y})`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onMouseMove={onMouseMove}
  >
    {disableDefaultTooltips ? null : (
      <title>{tooltip != null ? tooltip : label}</title>
    )}
    <rect width={width} height={height} fill="white" className="flame-rect" />
    <rect
      width={width}
      height={height}
      fill={backgroundColor}
      onClick={onClick}
      className="flame-rect"
      style={{
        opacity: isDimmed ? 0.5 : 1,
      }}
    />
    {width >= minWidthToDisplayText && (
      <foreignObject
        width={width}
        height={height}
        className="flame-foreignObject"
        style={{
          opacity: isDimmed ? 0.75 : 1,
          paddingLeft: x < 0 ? -x : 0,
        }}
        y={height < textHeight ? -textHeight : 0}
      >
        <div
          className="flame-div"
          style={{
            color,
            height: "100%",
            alignItems: "center",
            display: "flex",
            padding: "0 0.5rem",
          }}>
          {label}
        </div>
      </foreignObject>
    )}
  </g>
);

export default LabeledRect;
