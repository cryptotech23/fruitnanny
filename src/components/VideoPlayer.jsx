import React from "react";

const VideoPlayer = props => (
  <div id="videoContainer" data-fullscreen="false">
    {/* eslint-disable-line */}
    <video id="video" srcobject={props.stream} autoPlay muted />
    <div id="fullscreen-info" className="fs-info">
      <div id="fs-temperature" />
      <div id="fs-humidity" />
      <div id="fs-audiolevel" />
    </div>

    <div id="video-controls" className="controls" data-state="hidden">
      <button id="playpause" type="button" data-state="play">
        <i className="fa fa-play" aria-hidden="true" />
      </button>
      <button id="light" type="button" data-state="on">
        <i className="fa fa-lightbulb-o" />
      </button>
      <div className="empty">&nbsp;</div>
      <button id="mute" type="button" data-state="mute">
        <i className="fa fa-volume-up" aria-hidden="true" />
      </button>
      <div className="sliderdiv">
        <input id="volume_slider" type="text" />
      </div>
      <button id="fs" type="button" data-state="go-fullscreen">
        <i className="fa fa-arrows-alt" aria-hidden="true" />
      </button>
    </div>
  </div>
);

export default VideoPlayer;
