import {Button} from "./components/NavigationBar";

import {ObservableValue} from "./ObservableValue";
import {Page} from "./Page";
import {Info} from "./CommunicationController";

export type State = {
    photoUrl: ObservableValue<string | undefined>;
    menus: ObservableValue<Button[][]>;
    page: ObservableValue<Page>;
    focusedElement: ObservableValue<HTMLInputElement | undefined>;
    wifi: ObservableValue<Info>
    brightness: ObservableValue<number>
}