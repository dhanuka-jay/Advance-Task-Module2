import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Icon } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

import EmployerFeed from '../EmployerFeed/EmployerFeed.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {
                name: '',
                email: '',
                phone: '',
                firstName: '',
                lastName: '',
                location: {
                    country: '',
                    city: ''
                }
            }
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.setCompanyData = this.setCompanyData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.setTalentData = this.setTalentData.bind(this);

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadTalentData();
        this.init()
        this.loadEmployerData();
        
    };

    handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            //console.log(this.state.loadPosition);            
            this.setState({
                loadPosition: this.state.loadPosition + 5,
                loadNumber: this.state.loadNumber + 5
            });

            this.loadTalentData();
        }
    }

    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofileservices.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer                  
                } this.setCompanyData(employerData.companyContact)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadTalentData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofileservices.azurewebsites.net/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: { Position: this.state.loadPosition, Number: this.state.loadNumber },
            success: function (res) {
                let talentData = null;
                if (res) {
                    talentData = res.data
                } this.setTalentData(talentData);
            }.bind(this),
            error: function (res) {
                console.log('myError :',res)
            }
        })
    }

    setCompanyData(employerData) {
        //let newSD = Object.assign({}, this.state.companyDetails, employerData)
        this.setState({
            companyDetails: employerData
        })
    }

    setTalentData(talentData) {
        this.setState({
            feedData: talentData
        })
    }

    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile
                            employerDetails={this.state.companyDetails}
                        />
                    </div>
                    <div className="eight wide column">
                        {
                            this.state.feedData.map(talent => (
                                <TalentCard
                                    key={talent.id}
                                    talent={talent}
                                />
                            ))
                        }                        
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion

                            />
                        </div>
                    </div>
            </div>
            </BodyWrapper>
        )
    }
}