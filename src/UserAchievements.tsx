import {
  AutocompleteArrayInput,
  ReferenceArrayInput,
  SaveContextProvider,
  SimpleForm,
  TextInput,
  useEditContext,
  useGetList,
  useNotify,
  useRedirect,
  useSaveContext,
} from 'react-admin';
import * as React from 'react';
import { useMemo } from 'react';

export const createSearchFilter = (searchText: string) => ({ q: searchText });

export function formatObjToJsonProp(obj: object | undefined): string | undefined {
  return JSON.stringify(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseJsonToObjStrProp(json: string | undefined): any {
  return JSON.parse(json ?? '{}');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function valueToId(value: any): number {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return Number(value);
  }
  if (typeof value === 'object' && Object.hasOwn(value, 'id')) {
    return value.id;
  }
  // eslint-disable-next-line no-console
  console.error(`Can not transform this value to id: ${value}`);
  return -1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatAnyArray(anyObjArray: any[] | undefined): number[] {
  if (Array.isArray(anyObjArray)) {
    return anyObjArray.map(anyObj => valueToId(anyObj));
  } else {
    return [];
  }
}

export const UserAchievements = () => {
  const { record, redirect: redirectTo, resource } = useEditContext();
  const redirect = useRedirect();
  const notify = useNotify();
  const { save, mutationMode } = useSaveContext();

  const { data: userAchievementsData } = useGetList('user112achievements');

  const currentAchievementIds: number[] = useMemo(() => {
    return userAchievementsData?.filter(a => a.id)?.map(a => a.id as number) ?? [];
  }, [userAchievementsData]);

  const unionRecord = { ...record, currentAchievements: currentAchievementIds, achievements: userAchievementsData };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customSave: typeof save = async (recordToSave): Promise<any> => {
    // save...

    notify('ra.notification.updated', {
      type: 'info',
      messageArgs: { smart_count: 1 },
      undoable: mutationMode === 'undoable',
    });

    if (redirectTo) {
      redirect(redirectTo, resource, record.id);
    }
  };

  return (
    <SaveContextProvider value={{ save: customSave }}>
      <SimpleForm record={unionRecord} warnWhenUnsavedChanges>
        <TextInput label="Current Achievements" source="currentAchievements" parse={parseJsonToObjStrProp} format={formatObjToJsonProp} fullWidth sx={{ display: 'none' }} />
        <ReferenceArrayInput label="Achievements" source="achievements" format={formatAnyArray} reference="achievement" allowEmpty>
          <AutocompleteArrayInput optionText={o => o.name} format={formatAnyArray} filterToQuery={createSearchFilter} fullWidth />
        </ReferenceArrayInput>
      </SimpleForm>
    </SaveContextProvider>
  );
};
