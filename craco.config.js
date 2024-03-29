const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    
    webpack: {
        alias: {
            '@app': resolvePath('./src/app'),
            '@models': resolvePath('./src/app/common/models'),
            '@services': resolvePath('./src/app/common/services'),
            '@stores': resolvePath('./src/app/common/stores'),
            '@common': resolvePath('./src/app/common'),
            '@styles': resolvePath('./src/app/common/styles'),
            '@components': resolvePath('./src/app/components'),
        }
    },
  
}