import React, { useRef, useEffect, useState } from "react";
import "./zigzag.css";

type ZigzagProps = {
  startX: number;
  startY: number;
  segmentWidths: number[];
  segmentHeights: number[];
};

const Zigzag: React.FC<ZigzagProps> = ({ startX, startY, segmentWidths, segmentHeights }) => {
  // Create a ref for the SVG path element to manipulate it directly
  const svgRef = useRef<SVGPathElement | null>(null);

  // State to store the calculated end points of the zigzag path
  const [endPoints, setEndPoints] = useState<{ endX: number; endY: number }>({ endX: 0, endY: 0 });

  useEffect(() => {
    // Use effect to animate the path and set up resizing logic
    const pathElement = svgRef.current;
    if (pathElement) {
      // Set the stroke dash array and offset for path animation
      const totalLength = pathElement.getTotalLength();
      pathElement.style.strokeDasharray = `${totalLength}`;
      pathElement.style.strokeDashoffset = `${totalLength}`;

      // Delay to ensure CSS reflow has occurred before starting the animation
      setTimeout(() => {
        pathElement.getBoundingClientRect(); // Trigger reflow
        pathElement.classList.add("animate-stroke"); // Start the animation
      }, 3000);

      // Calculate initial endpoint coordinates
      setEndPoints(calculateEndPoint());

      // Attach resize event listener to recalculate endpoints when window size changes
      const handleResize = () => setEndPoints(calculateEndPoint());
      window.addEventListener("resize", handleResize);

      // Cleanup function to remove event listener when component unmounts
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [segmentWidths, segmentHeights]); // Dependency array includes segment dimensions

  // Function to calculate the end point of the path based on container size
  const calculateEndPoint = (): { endX: number; endY: number } => {
    const container = document.querySelector(".home__image-map-container") as HTMLElement | null;
    if (!container) return { endX: 0, endY: 0 };

    // Get container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate endpoints as a proportion of container dimensions
    const endX = containerWidth * 0.9;
    const endY = containerHeight * 0.8;

    return { endX, endY };
  };

  // Create path data for the SVG based on segment widths and heights
  const pathData = [];
  let currentX = startX; // Initialize x-coordinate
  let currentY = startY; // Initialize y-coordinate

  // Determine the number of segments to use in the path
  const numSegments = Math.min(segmentWidths.length, segmentHeights.length);

  for (let i = 0; i < numSegments; i++) {
    const customSegmentWidth = segmentWidths[i];
    const customSegmentHeight = segmentHeights[i];

    // Alternate direction for each segment (zigzag pattern)
    let direction = i % 2 === 0 ? 1 : -1;

    // Ensure the last segment goes downward
    if (i === numSegments - 1) {
      direction = 1;
    }

    // Calculate control point for quadratic bezier curve
    const controlX = currentX + customSegmentWidth / 2;
    const controlY = currentY + direction * customSegmentHeight;

    // Calculate new end point of this segment
    const newX = currentX + customSegmentWidth;
    const newY = currentY;

    // Append this segment's path command to the pathData array
    pathData.push(`Q ${controlX},${controlY} ${newX},${newY}`);

    // Update current position to new end point
    currentX = newX;
    currentY = newY;
  }

  return (
    <>
      <svg className="home__zigzagline">
        <path
          ref={svgRef}
          d={`M${startX},${startY} ${pathData.join(" ")}`} // Create path data string
          stroke="white"
          fill="none"
          strokeWidth="2"
          className="zigzag-path"
        />
      </svg>

      {/* Inline styles for the zigzag path animation */}
      <style jsx>{`
        .zigzag-path {
          transition: stroke-dashoffset 3.8s ease-in-out;
          animation: dash-animation 5.8s linear infinite;
        }
        @keyframes dash-animation {
          0% {
            stroke-dashoffset: 350%; // Animate the stroke dash offset
          }
          50% {
            stroke-dashoffset: 0%; // Bring it back to 0 at halfway
          }
          100% {
            stroke-dashoffset: 0%; // Keep it at 0 at the end
          }
        }
        .animate-stroke {
          stroke-dashoffset: 0; // Final stroke offset when animation completes
        }
      `}</style>
    </>
  );
};

export default Zigzag;
