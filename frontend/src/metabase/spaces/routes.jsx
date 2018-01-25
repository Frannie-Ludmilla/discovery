import React from "react";
import { Route } from "metabase/hoc/Title";
import { IndexRoute } from 'react-router';

const Placeholder = ({ location, params }) => <pre>{JSON.stringify({ location, params }, null, 2)}</pre>

import SpacesList from './SpacesList'
// import Data from './Data'
const Data = Placeholder;
// import Guide from './Guide'
const Guide = Placeholder;
// import Shared from './Shared'
const Shared = Placeholder;
// import Dashboard from './Dashboard'
const Dashboard = Placeholder;
// import Database from './Database'
const Database = Placeholder;
// import Table from './Table'
const Table = Placeholder;
// import Questions from './Questions'
const Questions = Placeholder;
// import Question from './Question'
const Question = Placeholder;
// import Profile from './Profile'
const Profile = Placeholder;
// import NQF from './NQF'
const NQF = Placeholder;

// // Metric list and detail
// import Metrics from './Metrics'
const Metrics = Placeholder;
// import Metric from './Metric'
const Metric = Placeholder;
// import MetricPublish from './MetricPublish'
const MetricPublish = Placeholder;
// import MetricDescription from './MetricDescription'
const MetricDescription = Placeholder;
// import Publish from './Publish'
const Publish = Placeholder;
// import SegmentPublish from './SegmentPublish'
const SegmentPublish = Placeholder;
// import Segment from './Segment'
const Segment = Placeholder;
// import Segments from './Segments'
const Segments = Placeholder;
// import Metadata from './Metadata'
const Metadata = Placeholder;
//
import NewCollection from './NewCollection'

// Layouts
import OverworldLayout from './layouts/Overworld'
// import SpaceLayout from './layouts/Space'
// import EntityLayout from './layouts/Entity'
// const EntityLayout = OverworldLayout;
const SpaceLayout = OverworldLayout;
const EntityLayout = OverworldLayout;

const LayoutViewComponent = ({ layout, view, children, ...props }) =>
  React.cloneElement(layout, props, view);

const getRoutes = (store) =>
<Route path="/_spaces" component={LayoutViewComponent}>
  <IndexRoute components={{ layout: OverworldLayout, view: SpacesList }} />
  <Route path="profile" components={{ layout: OverworldLayout, view: Profile }} />
  <Route path="new" components={{ layout: EntityLayout, view: NQF }} />
  <Route path="collection/new" components={{ layout: EntityLayout, view: NewCollection }} />
  <Route path="data">
    <IndexRoute components={{ layout: EntityLayout, view: Data }} />
    <Route path="db/:id">
      <IndexRoute components={{ layout: EntityLayout, view: Database }} />
      <Route path=":sql" components={{ layout: EntityLayout, view: Database }} />
    </Route>
    <Route path="table/:id">
      <IndexRoute components={{ layout: EntityLayout, view: Table }} />
      <Route path=":qb" components={{ layout: EntityLayout, view: Table }} />
      <Route path="m/metadata" components={{ layout: EntityLayout, view: Metadata }} />
      <Route path="e/:scalar" components={{ layout: EntityLayout, view: Table }} />
      <Route path="t/:time" components={{ layout: EntityLayout, view: Table }} />
    </Route>
  </Route>
  <Route path=":space">
    <Route path="guide" components={{ layout: SpaceLayout, view: Guide }} />
    <Route path="questions" components={{ layout: SpaceLayout, view: Questions }} />
    <Route path="shared" components={{ layout: SpaceLayout, view: Shared }} />
    <Route path="dashboard/:id" components={{ layout: EntityLayout, view: Dashboard }} />
    <Route path="metrics" components={{ layout: SpaceLayout, view: Metrics }} />
    <Route path="metric/:id">
      <IndexRoute components={{ layout: EntityLayout, view: Metric }} />
      <Route path=":qb" components={{ layout: EntityLayout, view: Metric }} />
      <Route path="f/:segmentId" components={{ layout: EntityLayout, view: Metric }} />
    </Route>
    <Route path="segments" components={{ layout: SpaceLayout, view: Segments }} />
    <Route path="segment/:id">
      <IndexRoute components={{ layout: EntityLayout, view: Segment }} />
      <Route path=":qb" components={{ layout: EntityLayout, view: Segment }} />
    </Route>
    <Route path="question/:id">
      <IndexRoute components={{ layout: EntityLayout, view: Question }} />
      <Route path=":qb" components={{ layout: EntityLayout, view: Question }} />
      <Route path="e/:edit" components={{ layout: EntityLayout, view: Question }} />
      <Route path="p/publish">
        <IndexRoute components={{ layout: EntityLayout, view: Publish }} />
        <Route path="metric" components={{ layout: EntityLayout, view: MetricPublish }} />
        <Route path="metric/details" components={{ layout: EntityLayout, view: MetricDescription }} />
        <Route path="segment" components={{ layout: EntityLayout, view: SegmentPublish }} />
      </Route>
    </Route>
  </Route>
</Route>

export default getRoutes;
