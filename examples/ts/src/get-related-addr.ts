/* eslint-disable import/prefer-default-export */
export const getRelatedAddresses = (state: $TSFixMe) =>
  [state.address].concat(state.migratedFrom || []).filter(Boolean);
