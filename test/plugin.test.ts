import { multicssclass } from '../src/plugin';

test('plugin', () => {
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

  const plugin = multicssclass();

  if (plugin?.transform) {
    const out = plugin.transform(html, 'test.svelte');
    const code = out?.code!;
    const outHtml = `
<label
  class:text-gray-500={isValid} class:bg-gray-50={isValid} class:border-gray-300={isValid}>
  text
</label>
<label
  class:text-red-500={isValid} class:bg-red-50={isValid} class:border-red-300={isValid}>
  text
</label>
<label
  class:text-blue-500={isValid} class:bg-blue-50={isValid} class:border-blue-300={isValid}>
  text
</label>
<label
  class:text-green-500={isValid} class:bg-green-50={isValid} class:border-green-300={isValid}>
  text
</label>
`;

    expect(code?.length).toBeGreaterThan(0);
    expect(code).toBe(outHtml);
  }
});

test('plugin with sep', () => {
  const html = `
<label
  class:text-gray-500@bg-gray-50@border-gray-300={isValid}>
  text
</label>
<label
  class:text-red-500@bg-red-50@border-red-300={isValid}>
  text
</label>
<label
  class:text-blue-500@bg-blue-50@border-blue-300={isValid}>
  text
</label>
<label
  class:text-green-500@bg-green-50@border-green-300={isValid}>
  text
</label>
`;

  const plugin = multicssclass({ sep: '@' });

  if (plugin?.transform) {
    const out = plugin.transform(html, 'test.svelte');
    const code = out?.code!;
    const outHtml = `
<label
  class:text-gray-500={isValid} class:bg-gray-50={isValid} class:border-gray-300={isValid}>
  text
</label>
<label
  class:text-red-500={isValid} class:bg-red-50={isValid} class:border-red-300={isValid}>
  text
</label>
<label
  class:text-blue-500={isValid} class:bg-blue-50={isValid} class:border-blue-300={isValid}>
  text
</label>
<label
  class:text-green-500={isValid} class:bg-green-50={isValid} class:border-green-300={isValid}>
  text
</label>
`;

    expect(code?.length).toBeGreaterThan(0);
    expect(code).toBe(outHtml);
  }
});

test('plugin not operation', () => {
  const html = `
<label
  class:text-blue-500@@text-red-500={isValid}>
  text
</label>
<label
  class:text-yellow-500@@text-black-500={isValid}>
  text
</label>
`;

  const plugin = multicssclass({ sep: '@' });

  if (plugin?.transform) {
    const out = plugin.transform(html, 'test.svelte');
    const code = out?.code!;
    const outHtml = `
<label
  class:text-blue-500={isValid} class:text-red-500={!(isValid)}>
  text
</label>
<label
  class:text-yellow-500={isValid} class:text-black-500={!(isValid)}>
  text
</label>
`;

    expect(code?.length).toBeGreaterThan(0);
    expect(code).toBe(outHtml);
  }
});

test('plugin not operation syntax-error', () => {
  const html = `
<label
  class:text-blue-500@@text-red-500@@syntax-error={isValid}>
  text
</label>
`;

  const plugin = multicssclass({ sep: '@' });

  if (plugin?.transform) {
    try {
      plugin.transform(html, 'test.svelte');
    } catch (err) {
      expect(err).toBeDefined();
    }
  }
});
