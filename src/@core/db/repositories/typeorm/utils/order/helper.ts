import { OrderObject } from '@domain/basic/irepository';
import HttpError from '@domain/utils/errors/http-errors';

export function OrderHelper(object: OrderObject, orderColumns: string[]) {
    if (object) {
        if (!orderColumns.includes(object.orderBy))
            new HttpError(
                'Invalid order column, order columns available are: [' +
                orderColumns.join(',') +
                ']',
            ).BadRequest();
        object.orderDirection =
            object.orderDirection.toUpperCase() !== 'ASC' &&
            object.orderDirection.toUpperCase() !== 'DESC'
                ? 'ASC'
                : object.orderDirection.toUpperCase();
        const order = CreateTableOrder(
            object.orderBy.split('.'),
            object.orderDirection,
        );
        return order;
    } else {
        return { id: 'ASC' };
    }
}

function CreateTableOrder(keys: string[], value: string) {
    if (keys.length === 1) {
        return { [keys[0]]: `${value}` };
    }

    const key = keys.shift();
    return { [key]: CreateTableOrder(keys, value) };
}
