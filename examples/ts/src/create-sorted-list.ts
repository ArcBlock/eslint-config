import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

export const createSortedList = (list: $TSFixMe) => uniq(flatten(list)).filter(Boolean).sort();
