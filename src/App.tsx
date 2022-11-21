import { Admin, Resource, ListGuesser } from "react-admin";
import { fakeJsonDataProvider } from './fakeData/reproDataProvider';
import { UserEdit } from './UserEdit';

const App = () => (
    <Admin dataProvider={fakeJsonDataProvider}>
      <Resource name="user" list={ListGuesser} edit={UserEdit} />
      <Resource name="achievement" list={ListGuesser} />
    </Admin>
);

export default App;