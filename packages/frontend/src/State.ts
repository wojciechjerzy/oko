import {Button} from "./components/NavigationBar";

import {ObservableValue} from "./ObservableValue";
import {Page} from "./Page";

export type State = {
    photoUrl: ObservableValue<string | undefined>;
    menus: ObservableValue<Button[][]>;
    page: ObservableValue<Page>;
    focusedElement: ObservableValue<HTMLInputElement | undefined>;
    wifi: ObservableValue<any>
}