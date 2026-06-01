import {Button} from "./components/NavigationBar";

import {ObservableValue} from "./ObservableValue";

export type State = {
    photoUrl: ObservableValue<string | undefined>;
    menus: ObservableValue<Button[][]>;
    page: ObservableValue<string>;
    focusedElement: ObservableValue<HTMLInputElement | undefined>;
}