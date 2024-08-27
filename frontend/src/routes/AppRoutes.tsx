import React from 'react';
import { Redirect, Route, Router, Switch } from 'wouter';
import { HomePage } from '../pages/HomePage';
import SchedulePage from '../pages/SchedulePage';
import GenerateSchedulePage from '../pages/GenerateSchedulePage';
import AutomaticGenerationPage from '../pages/AutomaticGenerationPage';
import SelectEntityPage from '../pages/SelectEntityPage';
import ManageEntityPage from '../pages/ManageGroupPage';
import ScheduleEditorPage from '../pages/ScheduleEditorPage';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { AuthorizationPage } from '../pages/AuthorizationPage';
import { ROLES } from '../api/auth/types';
import { DashboardPage } from '../pages/DashboardPage';
import ManualScheduleEditorPage from '../pages/ManualScheduleEditorPage'; // Импортируем новую страницу

const AppRoutes = () => {
  const payload = useSelector((state: IRootState) => ({
    accessToken: state.auth.authData.accessToken,
    role: state.auth.authData.role,
  }));

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/signIn">
          <AuthorizationPage />
        </Route>
        <Route path="/dashboard">
          {/* {payload.role === ROLES.ADMIN ? ( */}
          <DashboardPage />
          {/* ) : ( */}
          <Redirect to={'/'} />
          {/* )} */}
        </Route>
        <Route path="/schedule">
          <SchedulePage />
        </Route>
        <Route path="/generate">
          <GenerateSchedulePage />
        </Route>
        <Route path="/generate/automatic">
          <AutomaticGenerationPage />
        </Route>
        <Route path="/add">
          <SelectEntityPage />
        </Route>
        <Route path="/add/:entityType">
          {(params) => <ManageEntityPage entityType={params.entityType} />}
        </Route>
        <Route path="/edit">
          <ScheduleEditorPage />
        </Route>
        <Route path="/manual/edit">
          {' '}
          {/* Новый маршрут для ручного редактирования */}
          <ManualScheduleEditorPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
