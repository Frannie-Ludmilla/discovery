import React from 'react'
import { Link } from '@curi/react'
import { Absolute, Button, Box, Relative } from 'rebass'

import {
    getQuestion,
    getCurrentSpace,
    getSegmentsForSpace
} from './selectors'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        space: getCurrentSpace(state),
        question: getQuestion(state),
        segment: getSegmentsForSpace(state)[0]
    }
}

const SegmentPublish = ({ space, question, segment }) =>
    <Relative style={{ height: '100vh' }}>
        <Box style={{ overflow: 'hidden', height: 810 }} ml='auto' mr='auto'>
            <img src={process.env.PUBLIC_URL + '/publish_segment.png'} alt="a" />
        </Box>
        <Absolute bottom right>
            <Link to='Segment' params={{ space: space.slug, id: segment.id }} style={{ width: 300, height: 300, display: 'block' }}>
                <Button>Publish to {space.name}</Button>
            </Link>
        </Absolute>
    </Relative>


export default connect(mapStateToProps)(SegmentPublish)
