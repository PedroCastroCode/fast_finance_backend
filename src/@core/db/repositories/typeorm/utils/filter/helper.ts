import { FilterObject } from '@domain/basic/irepository';
import HttpError from '@domain/utils/errors/http-errors';
import { Between, ILike } from 'typeorm';

export function FilterHelper(
  filterObjects: FilterObject[],
  filterColumns: FilterColumns[],
) {
  const filteredData = {};

  if (
    filterObjects &&
    filterObjects.length > 0 &&
    filterObjects.every(validateFilterObject)
  ) {
    filterObjects.forEach((object) => {
      const { searchValue } = object;
      const { column, type } = filterColumns.find(
        (x) => x.column == object.searchColumn,
      ) ?? { column: '', type: '' };
      if (!type)
        new HttpError(
          'Invalid filter column, columns available to filter are: [' +
            filterColumns.map((x) => x.column).join(',') +
            ']',
        ).BadRequest();
      const columnParts = column.split('.');
      let currentObj = filteredData;

      for (let i = 0; i < columnParts.length - 1; i++) {
        const part = columnParts[i];
        currentObj[part] = currentObj[part] || {};
        currentObj = currentObj[part];
      }
      currentObj[columnParts[columnParts.length - 1]] = GetValueForColum(
        type,
        searchValue,
      );
    });
  }

  return filteredData;
}

function validateFilterObject(object: FilterObject) {
  return object.searchColumn && object.searchValue;
}

export type FilterColumns = {
  column: string;
  type: 'string' | 'boolean' | 'date' | 'number' | 'date_between';
};

function GetValueForColum(type: string, searchValue: any) {
  if (type == 'boolean') {
    return searchValue == 'true';
  } else if (type == 'date') {
    return searchValue;
  } else if (type == 'date_between') {
    if (searchValue.includes(':')) {
      const values = searchValue.split(':');
      const initialDate = new Date(values[0] + ' 00:00:00');
      const finalDate = new Date(values[1] + ' 23:59:59');
      if (initialDate > finalDate)
        new HttpError('Invalid date range').BadRequest();
      return Between(initialDate, finalDate);
    } else {
      const initialDate = new Date(searchValue + ' 00:00:00');
      const finalDate = new Date(searchValue + ' 23:59:59');
      return Between(initialDate, finalDate);
    }
  } else if (type == 'string') {
    return ILike(`%${searchValue}%`);
  } else if (type == 'number') {
    return parseInt(searchValue);
  } else {
    return ILike(`%${searchValue}%`);
  }
}
