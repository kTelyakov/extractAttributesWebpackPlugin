class ExtractFromAssetsWebpackPlugin {
  constructor (regexp, outputFileName = 'output.json') {
    if (!regexp) {
      console.error(`[ExtractFromAssetsWebpackPlugin]: please pass regexp argument`)
      return
    }
    this.regexp = regexp
    this.outputFileName = outputFileName
    this.output = []
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'ExtractFromAssetsWebpackPlugin',
      (compilation, callback) => {
        this.output = []
        const assets = compilation.getAssets()
        assets.map(asset => {
          const sourceStr = asset.source.source()
          if (typeof sourceStr === 'string') {
            const matchingResult = sourceStr.match(this.regexp)
            if (matchingResult) {
              this.output.push([...matchingResult])
            }
          }
        })
        console.log('OUTPUT : ', this.output)
        callback();
      }
    );
  }
}

module.exports = ExtractFromAssetsWebpackPlugin;
