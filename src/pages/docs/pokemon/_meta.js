const { createCatchAllMeta } = require("nextra/catch-all");

module.exports = async () => {
  // NOTE: Imports only work within the function that exports the module
  const { getPokemonList } = require("@/utils");

  const data = await getPokemonList();

  /** @see https://github.com/shuding/nextra/issues/1980#issuecomment-1637147078 */

  // FIXME: This is horrible but does the job
  const filePaths = data.map(({ name }) => name + ".mdx");

  return createCatchAllMeta(
    // Ensure you didn't forget define some file by providing all paths of remote files
    filePaths,
    {
      // Next you can override the order of your meta files, folders should have `type: 'folder'` and have `items` property
      // index: {
      //   title: "Introduction",
      //   theme: {
      //     toc: false,
      //   },
      // },
      // "getting-started": {
      //   type: "folder",
      //   title: "🦄 GETTING Started",
      //   items: {
      //     parser: "",
      //   },
      // },
    }
  );
};
