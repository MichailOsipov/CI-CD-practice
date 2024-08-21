import { DotenvParseOutput } from 'dotenv-flow';
import { Configuration } from 'webpack-dev-server';

export const getDevServer = (env: DotenvParseOutput): Configuration => {
    const {
        HOST,
        HAS_FAST_REFRESH,
        OPEN_IN_BROWSER,
        PAGE_ALIAS,
        PORT,
    } = env;

    const FAST_REFRESH = HAS_FAST_REFRESH === 'true';
    const OPEN_BROWSER = OPEN_IN_BROWSER !== 'false';
    const port = PORT || 3001;

    return {
        // allowedHosts: 'all',
        // devMiddleware: {
        //     publicPath: '/',
        //     stats: 'minimal',
        // },
        // historyApiFallback: {
        //     disableDotRule: true,
        //     index: '/',
        // },
        host: HOST || '0.0.0.0',
        hot: FAST_REFRESH,
        open: (
          OPEN_BROWSER
            ? {
                target: [`http://localhost:${port}`],
              }
            : false
        ),
        port,
        server: 'http',
        // setupMiddlewares: (middlewares: Middleware[], devServer: Server): Middleware[] => {
        //     const setupProxyPath = resolvePath('proxy/setupProxy.js');
        //     if (fs.existsSync(setupProxyPath)) {
        //       require(setupProxyPath)(devServer.app);
        //     }
      
        //     return middlewares;
        // },
    } as Configuration;
};
