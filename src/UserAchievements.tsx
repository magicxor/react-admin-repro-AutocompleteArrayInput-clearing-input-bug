import {
  AutocompleteArrayInput,
  ReferenceArrayInput,
  SaveContextProvider,
  SimpleForm,
  useEditContext,
  useGetList,
  useSaveContext,
} from 'react-admin';
import * as React from 'react';

export const createSearchFilter = (searchText: string) => ({ q: searchText });

export const formatFunc = (arr: any) => arr.map((item: any) => item.id);

export const UserAchievements = () => {
  const { record } = useEditContext();
  const { save } = useSaveContext();
  const { data: userAchievementsData } = useGetList('user112achievements');
  const unionRecord = { ...record, achievements: userAchievementsData };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customSave: typeof save = async (recordToSave): Promise<any> => {
    // save...
  };

  return (
    <SaveContextProvider value={{ save: customSave }}>
      <SimpleForm record={unionRecord} warnWhenUnsavedChanges>
        <ReferenceArrayInput label="Achievements" source="achievements" reference="achievement" allowEmpty>
          <AutocompleteArrayInput optionText={o => o.name} format={formatFunc} filterToQuery={createSearchFilter} fullWidth />
        </ReferenceArrayInput>
      </SimpleForm>
    </SaveContextProvider>
  );
};
