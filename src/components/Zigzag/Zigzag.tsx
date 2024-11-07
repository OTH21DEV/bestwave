import React, { useRef, useEffect, useState } from 'react';
import "./zigzag.css";

const Zigzag = ({ startX, startY, endX, endY, segmentWidths, segmentHeights }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const pathElement = svgRef.current;
    if (!pathElement) return;

    const totalLength = pathElement.getTotalLength();
    pathElement.style.strokeDasharray = `${totalLength}`;
    pathElement.style.strokeDashoffset = `${totalLength}`;

    // Trigger a reflow to restart the CSS animation
    // pathElement.getBoundingClientRect();
    // pathElement.classList.add("animate-stroke");
    setTimeout(() => {
        // Trigger a reflow to apply the animation class after delay
        pathElement.getBoundingClientRect();
        pathElement.classList.add('animate-stroke');
      }, 3000);
  }, []);

  const pathData = [];
  let currentX = startX;
  let currentY = startY;

  const numSegments = Math.min(segmentWidths.length, segmentHeights.length);

  for (let i = 0; i < numSegments; i++) {
    const customSegmentWidth = segmentWidths[i];
    const customSegmentHeight = segmentHeights[i];

    let direction = i % 2 === 0 ? 1 : -1;

    if (i === numSegments - 1) {
      direction = 1;
    }

    const controlX = currentX + customSegmentWidth / 2;
    const controlY = currentY + direction * customSegmentHeight;

    const newX = currentX + customSegmentWidth;
    const newY = currentY;

    pathData.push(`Q ${controlX},${controlY} ${newX},${newY}`);

    currentX = newX;
    currentY = newY;
  }

  const dotStyle = {
    position: 'absolute',

    top:`20.6em`,
right:`18.9em`,
transform:`rotate(-25deg)`,
    width: '15px',
    height: '15px',
    backgroundColor: '#4af6ce',
    borderRadius: '50%',
    
    
  };

  return (
    <>
      <svg className="home__zigzagline">
        <path ref={svgRef} d={`M${startX},${startY} ${pathData.join(" ")}`} stroke="white" fill="none" strokeWidth="2" className="zigzag-path" />
      </svg>
      <span style={dotStyle}></span>
      <style jsx>{`
        .zigzag-path {
          transition: stroke-dashoffset 3.8s ease-in-out;
          animation: dash-animation 5.8s linear infinite;
        }
          @keyframes dash-animation {
          0% {
            stroke-dashoffset: 350%;
          }
          50% {
            stroke-dashoffset: 0%;
          }
          100% {
            stroke-dashoffset: 0%;
          }
        }
        .animate-stroke {
          stroke-dashoffset: 0;
        }
      `}</style>
   
    </>
  );
 
};
export default Zigzag;
