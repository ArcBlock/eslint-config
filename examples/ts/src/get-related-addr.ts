export const getRelatedAddresses = (state: $TSFixMe) =>
  [state.address].concat(state.migratedFrom || []).filter(Boolean);
