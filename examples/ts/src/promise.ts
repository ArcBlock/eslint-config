function promiseFn() {
  return new Promise(() => {});
}

async function main() {
  await promiseFn();
}

main();
