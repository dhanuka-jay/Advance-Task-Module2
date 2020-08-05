import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {     

        const { name, email, phone, location: { country, city } } = this.props.employerDetails;
        //const { location: { country, city } } = this.props.employerDetails;

        return ( 
                <div className="ui card">
                    <div className="content">
                        <div className="center aligned" style={{ paddingBottom: "10px" }}>
                            <img className="ui tiny circular image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
                        </div>
                        <div className="center aligned header">{name}</div>
                        <div className="center aligned meta">
                            <span className="category"><i className="map marker alternate icon"></i> {` ${city}, ${country}`}</span>
                        </div>
                        <div className="center aligned description">
                            <p>We currently do not have specific skills that we desire</p>
                        </div>
                    </div>
                    <div className="extra content">
                        <div>
                            <i className="phone icon"></i> : {phone}
                        </div>
                        <div>
                            <i className="envelope icon"></i> : {email}
                        </div>
                    </div>
                </div>
            )
    }
}