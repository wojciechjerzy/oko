import {MyEvent} from "./utils/MyEvent";

export class ObservableValue<TYPE> extends MyEvent<TYPE> {
    private _value: TYPE;

    constructor(value: TYPE) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set value(val: TYPE) {
        if (this._value !== val) {
            this.invoke(this._value = val);
        }
    }
}