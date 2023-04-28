import { multicssclass } from '../src/plugin';

import Benchmark from "benchmark";
const suite = new Benchmark.Suite();

const html = `
  <label
    class:text-gray-500|bg-gray-50|border-gray-300={isValid}>
    text
  </label>
  <label
    class:text-red-500|bg-red-50|border-red-300={isValid}>
    text
  </label>
  <label
    class:text-blue-500,bg-blue-50,border-blue-300={isValid}>
    text
  </label>
  <label
    class:text-green-500;bg-green-50;border-green-300={isValid}>
    text
  </label>
`;

suite
  .add("Simple pass", function () {
    const plugin = multicssclass();
    plugin.transform(html, 'test.svelte');
  })
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  .on("complete", function (this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ "async": true });
