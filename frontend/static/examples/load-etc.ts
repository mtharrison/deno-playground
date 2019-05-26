async function main() {

  // create subprocess

  const p = Deno.run({
    args: ["ls", "-al", "/etc"]
  });

  // await its completion

  await p.status();
}

main();
