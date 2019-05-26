async function main() {

  // create subprocess

  const p = Deno.run({
    args: ["ls", "-al", "/home/deno"]
  });

  // await its completion

  await p.status();
}

main();
