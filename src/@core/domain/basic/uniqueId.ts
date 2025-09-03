import { parse, stringify, v4 } from 'uuid';
import { ValueObject } from '@domain/basic/value-object';

export default class UniqueId extends ValueObject<string> {
    private constructor(value: string) {
        super(value ?? v4().toString());
    }

    public static unique() {
        return new UniqueId(v4().toString());
    }

    public static with(value: string) {
        try {
            if (!value) {
                return;
            }
            return new UniqueId(stringify(parse(value)));
        } catch (e) {
            throw new Error('Invalid value for id');
        }
    }
}
