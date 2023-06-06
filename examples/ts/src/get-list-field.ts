/* eslint-disable import/prefer-default-export */
import get from 'lodash/get';

export const getListField = (obj: $TSFixMe, key: string) => get(obj, `${key}List`) || get(obj, key) || [];
