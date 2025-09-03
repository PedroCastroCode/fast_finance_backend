import { Between, ILike } from 'typeorm';
import {
  FilterColumns,
  FilterHelper,
} from '@db/repositories/typeorm/utils/filter/helper';

describe('Testing FilterHelper function', () => {
  it('Should return a filter object', () => {
    const filterColumns: FilterColumns[] = [
      { column: 'person.address.number', type: 'string' },
      { column: 'person.name', type: 'string' },
      { column: 'person.id_company', type: 'string' },
      { column: 'order', type: 'string' },
    ];
    const elements = [
      {
        filterObject: [
          {
            searchColumn: 'person.address.number',
            searchValue: 'teste',
          },
        ],
        expected: {
          person: {
            address: { number: ILike('%teste%') },
          },
        },
      },
      {
        filterObject: [
          {
            searchColumn: 'person.name',
            searchValue: 'teste',
          },
        ],
        expected: {
          person: { name: ILike('%teste%') },
        },
      },
      {
        filterObject: [
          {
            searchColumn: 'order',
            searchValue: 'teste',
          },
        ],
        expected: {
          order: ILike('%teste%'),
        },
      },
    ];
    elements.forEach((element) => {
      const filter = FilterHelper(element.filterObject, filterColumns);
      expect(filter).toStrictEqual(element.expected);
    });
  });

  it('Should throw filter error', () => {
    const stringArray = [
      {
        searchColumn: 'order.service.quantity',
        searchValue: 'teste',
      },
    ];
    expect(() =>
      FilterHelper(stringArray, [
        { column: 'order.service.quantity2', type: 'string' },
      ]),
    ).toThrow();
  });

  it('Deve retornar range de datas', () => {
    const filterColumns: FilterColumns[] = [
      { column: 'dt_visit', type: 'date_between' },
    ];

    const elements = [
      {
        filterObject: [
          {
            searchColumn: 'dt_visit',
            searchValue: '2021-01-01',
          },
        ],
        expected: {
          dt_visit: Between(
            new Date('2021-01-01T00:00:00.000'),
            new Date('2021-01-01T23:59:59.000'),
          ),
        },
      },
      {
        filterObject: [
          {
            searchColumn: 'dt_visit',
            searchValue: '2021-01-01:2021-01-04',
          },
        ],
        expected: {
          dt_visit: Between(
            new Date('2021-01-01T00:00:00.000'),
            new Date('2021-01-04T23:59:59.000'),
          ),
        },
      },
    ];

    elements.forEach((element) => {
      const filter = FilterHelper(element.filterObject, filterColumns);
      expect(filter).toEqual(element.expected);
    });
  });
});
