import React from 'react';

function Iframetest() {
    return (
        <div className="background-color ">
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-md-8 background-color1" >
                        <iframe id="vimeoIframe"
                            title="vimeoIframe"
                            width="100%"
                            height="100%"
                            src="https://vimeo.com/event/600158/embed">
                        </iframe>
                    </div>
                    <div className="col-md-4 container-test">
                        <iframe id="inlineFrameExample"
                                className="iframe-style"
                                title="Inline Frame Example"
                                width="100%"
                                height="100%"
                                src="http://localhost:3000/student/forsvaret">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Iframetest;
