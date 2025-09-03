import { OrderHelper } from '@db/repositories/typeorm/utils/order/helper';

describe('Testing OrderHelper function', () => {
  it('Should return a object of order', () => {
    const orderColumns = ['person.address.number', 'person.name', 'created_at'];
    const elements = [
      {
        orderObject: {
          orderBy: 'person.address.number',
          orderDirection: 'ASC',
        },
        expected: {
          person: {
            address: {
              number: 'ASC',
            },
          },
        },
      },
      {
        orderObject: {
          orderBy: 'person.name',
          orderDirection: 'DESC',
        },
        expected: {
          person: {
            name: 'DESC',
          },
        },
      },
      {
        orderObject: {
          orderBy: 'created_at',
          orderDirection: 'asd',
        },
        expected: {
          created_at: 'ASC',
        },
      },
      {
        orderObject: null,
        expected: {
          id: 'ASC',
        },
      },
    ];
    elements.forEach((element) => {
      const order = OrderHelper(element.orderObject, orderColumns);
      expect(order).toEqual(element.expected);
    });
  });
  it('should throw error if orderBy is not found', () => {
    const orderColumns = ['person.address', 'person', 'number'];
    const elements = [
      {
        orderObject: {
          orderBy: 'person.address.number',
          orderDirection: 'ASC',
        },
      },
      {
        orderObject: {
          orderBy: 'person.name',
          orderDirection: 'DESC',
        },
      },
      {
        orderObject: {
          orderBy: 'created_at',
          orderDirection: 'asd',
        },
      },
      {
        orderObject: {
          orderBy: null,
          orderDirection: null,
        },
      },
      {
        orderObject: {
          orderBy: undefined,
          orderDirection: undefined,
        },
      },
      {
        orderObject: {
          orderBy: 0,
          orderDirection: 12,
        },
      },
    ];
    elements.forEach((element) => {
      expect(() =>
        OrderHelper(element.orderObject as any, orderColumns),
      ).toThrow();
    });
  });
});
