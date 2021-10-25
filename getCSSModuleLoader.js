import { webpack } from "@confirmit/js-build-tools";

export default ({ sourceMap }) => webpack.getCssModuleLoader({ sourceMap });