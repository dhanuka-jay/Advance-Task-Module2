import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Button } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVideoMode : true
        }

        this.setVideoMode = this.setVideoMode.bind(this);
    };

    setVideoMode() {
        this.setState({
            isVideoMode: !this.state.isVideoMode
        })
    }

    render() {

        const { currentEmployment, name, level, visa, skills, cvurl, videoUrl, photoId, linkedAccounts } = this.props.talent;

        if (this.state.isVideoMode == true) {
            return (
                <div className="ui card" style={{ width: "100%" }}>
                    <div className="content">
                        <i className="large right floated star icon"></i>
                        <div className="header"> {name} </div>
                    </div>
                    <div className="container">
                        <video width="100%" controls>
                            <source src={videoUrl} type="video/mp4"></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="content">
                        <i className="large video icon" style={iconPadding} onClick={this.setVideoMode}></i>
                        <a href={cvurl}><i className="large file pdf outline icon" style={iconPadding}></i></a>
                        <a href={linkedAccounts.linkedIn}><i className="large linkedin alternate icon" style={iconPadding}></i></a>
                        <a href={linkedAccounts.github}><i className="large github icon" style={iconPadding}></i></a>
                    </div>
                        {skills.length > 0 ?
                            <div style={skillContainer}>
                                {skills.map(skill => (
                                    <Button basic color="blue">{skill}</Button>
                                ))}
                            </div>
                            :
                            <React.Fragment></React.Fragment>
                        }
                </div>
            )
        }
        else {
            return (
                <div className="ui card" style={{ width: "100%" }}>
                    <div className="content">
                        <i className="large right floated star icon"></i>
                        <div className="header"> {name} </div>
                    </div>
                    <div className="container" style={gridContainer}>
                        <img src={photoId ? photoId : "https://react.semantic-ui.com/images/avatar/small/matthew.png"} style={{ width: "100%" }} />
                        <div style={{ paddingLeft: "1rem" }}>
                            <div className="content" style={divPadding}>
                                <strong>Talent Snapshot</strong>
                            </div>
                            <div className="content" style={divPadding}>
                                CURRENT EMPLOYER
                        </div>
                            <div className="meta">
                                {currentEmployment}
                            </div>
                            <div className="content" style={divPadding}>
                                VISA STATUS
                        </div>
                            <div className="meta">
                                {visa ? visa : 'N/A'}
                            </div>
                            <div className="content" style={divPadding}>
                                POSITION
                        </div>
                            <div className="meta">
                                {level}
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <i className="large video icon" style={iconPadding} onClick={this.setVideoMode}></i>
                        <a href={cvurl}><i className="large file pdf outline icon" style={iconPadding}></i></a>
                        <a href={linkedAccounts.linkedIn}><i className="large linkedin alternate icon" style={iconPadding}></i></a>
                        <a href={linkedAccounts.github}><i className="large github icon" style={iconPadding}></i></a>
                    </div>
                    {skills.length > 0 ?
                        <div style={skillContainer}>
                            {skills.map(skill => (
                                <Button basic color="blue">{skill}</Button>
                            ))}
                        </div>
                        :
                        <React.Fragment></React.Fragment>
                    }
                </div>
            )
        }
    }   
}

const iconPadding = {
    paddingRight: "25%",
    margin: "0%"
}

const gridContainer = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: "0rem",
    margin: "0rem"
}

const divPadding = {
    paddingTop: "1rem"
}

const skillContainer = {
    padding: "1rem"
}
