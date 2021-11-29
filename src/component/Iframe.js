import React from 'react';

function Iframe() {
    return (
        <div className="background-color ">

            <div className="container">
                <div className="row align-items-start">
                    <div className="col-md-8 background-color1" >
                        <h1 className="text-center stream">STREAM</h1>


                    </div>
                    <div className="col-md-4 container-test">
                        <iframe id="inlineFrameExample"
                                title="Inline Frame Example"
                                width="100%"
                                height="100%"
                                src="http://localhost:3000/students/forsvaret">
                        </iframe>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Iframe;