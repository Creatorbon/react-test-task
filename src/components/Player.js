import React from 'react';

const style = {
    width: "100%",
    height: 750,
}

class YouTube extends React.Component {
    render() {
        var videoSrc = "https://www.youtube.com/embed/" +
            this.props.video + "?autoplay=" +
            this.props.autoplay + "&rel=" +
            this.props.modest;
        return (
            <div className="container">
                <iframe title='video' type="text/html" style={style}
                    src={videoSrc}
                    frameBorder="0" />
            </div>
        );
    }
};

YouTube.defaultProps = {
    video: 'L6HC1bqrLRQ'
  };

export default YouTube;
