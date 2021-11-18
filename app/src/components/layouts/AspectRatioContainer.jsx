import { useState, useRef, useEffect } from 'react';

const AspectRatioContainer = (props) => {
     let { aspectRatio, children, className, margin } = props;
     let containerRef = useRef();
     let [dimensions, setDimensions] = useState({ width: "100%", height: "100%" });

     let constrainSize = () => {
          let containerDimensions = {
               width: containerRef.current.offsetWidth,
               height: containerRef.current.offsetHeight
          }
          let width = containerDimensions.width;
          let height = containerDimensions.width / aspectRatio;
          if (height > containerDimensions.height) {
               height = containerDimensions.height;
               width = height * aspectRatio;
          }
          setDimensions({ width, height });
     }

     useEffect(() => {
          window.addEventListener('resize', function () {
               constrainSize();
          });
          constrainSize();
     }, [])

     return (
          <div ref={containerRef} className={`w-full h-full flex justify-center items-center box-border`}>
               <div style={dimensions} className={`box-border ${className}`}>
                    {children}
               </div>
          </div >
     )
}

export default AspectRatioContainer