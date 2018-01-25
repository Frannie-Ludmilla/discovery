import React from 'react'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'

import { logItem } from './logic'

import {
    getCurrentSpace,
    getDashboard 
} from './selectors'

var METABASE_SITE_URL = "https://stats.metabase.com"; 
var METABASE_SECRET_KEY = "0b91b1a1c81d0ec116304dfd602ae37f711b9979ccf226a275562baa0ac30a75";

var payload = {
    resource: { dashboard: 60 },
    params: {}
};

var token = jwt.sign(payload, METABASE_SECRET_KEY);
var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

class Dashboard extends React.Component {
    componentDidMount () {
        const { dashboard, space, dispatch } = this.props
        dispatch(logItem(space.id, dashboard, 'Dashboard'))
    }
    render () {
        return (
            <div>
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="100%"
                    height="600"
                    allowTransparency
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        space: getCurrentSpace(state),
        dashboard: getDashboard(state)
    }
}

export default connect(mapStateToProps)(Dashboard)
