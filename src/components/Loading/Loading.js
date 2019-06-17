import React from 'react';
import Loader from 'react-loader-spinner'
const Loading = () => {
    const [progress, setProgress] = React.useState(0);
    return (
        <div className="loading">
            <div className="isLo">
              <Loader 
         type="Puff"
         color="#00BFFF"
         height="100"	
         width="100"
      />   
      </div>
        </div>
    );
}

export default Loading;