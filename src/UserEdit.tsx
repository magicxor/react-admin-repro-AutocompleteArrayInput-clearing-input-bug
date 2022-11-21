import * as React from 'react';
import { Edit, Show, Tab, TabbedShowLayout, TabbedShowLayoutTabs } from 'react-admin';
import { UserAchievements } from './UserAchievements';

export const UserEdit = () => {
  return (
    <Show>
      <TabbedShowLayout tabs={<TabbedShowLayoutTabs variant="scrollable" scrollButtons="auto" />}>
        <Tab label="Achievements">
          <Edit title=" " redirect={false}>
            <UserAchievements />
          </Edit>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
