/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Webpack overrides for CRA via react-app-rewired.
 * - Подавляем предупреждения "Failed to parse source map" от зависимостей
 * - Полностью исключаем node_modules из обработки source-map-loader
 */
module.exports = function override(config, env) {
  // 1) Игнорируем предупреждения о невалидных sourcemap из зависимостей (в т.ч. stylis-plugin-rtl)
  const extraIgnores = [
    // Универсальный шаблон: предупреждение от source-map-loader про любой пакет
    { message: /Failed to parse source map/i },
    // На случай, если форма предупреждения отличается — функция-предикат
    function ignoreStylisPluginRtlSourceMapWarning(warning) {
      try {
        const msg = String(warning?.message || '');
        return msg.includes('Failed to parse source map') && msg.includes('stylis-plugin-rtl');
      } catch (e) {
        return false;
      }
    },
  ];
  config.ignoreWarnings = Array.isArray(config.ignoreWarnings)
    ? config.ignoreWarnings.concat(extraIgnores)
    : extraIgnores;

  // 2) Находим правило source-map-loader и исключаем из него node_modules целиком
  const addExcludeForSourceMapLoader = (rule) => {
    if (!rule) return;

    const NODE_MODULES_REGEX = /node_modules/;

    const markExclude = (r) => {
      if (!r) return;
      const usesSourceMapLoader =
        (typeof r.loader === 'string' && r.loader.includes('source-map-loader')) ||
        (Array.isArray(r.use) &&
          r.use.some(
            (u) =>
              (typeof u === 'string' && u.includes('source-map-loader')) ||
              (u && typeof u.loader === 'string' && u.loader.includes('source-map-loader'))
          ));

      if (usesSourceMapLoader) {
        if (Array.isArray(r.exclude)) {
          r.exclude.push(NODE_MODULES_REGEX);
        } else if (r.exclude) {
          r.exclude = [r.exclude, NODE_MODULES_REGEX];
        } else {
          r.exclude = [NODE_MODULES_REGEX];
        }

        // Если у лоадера есть опции — подстрахуемся и отключим парсинг ссылок на sourcemap
        if (Array.isArray(r.use)) {
          r.use = r.use.map((u) => {
            if (
              (typeof u === 'string' && u.includes('source-map-loader')) ||
              (u && typeof u.loader === 'string' && u.loader.includes('source-map-loader'))
            ) {
              const obj = typeof u === 'string' ? { loader: u } : { ...u };
              obj.options = {
                ...(obj.options || {}),
                // Опция source-map-loader v3+: фильтруем любые sourceMappingURL
                filterSourceMappingUrl: () => false,
              };
              return obj;
            }
            return u;
          });
        }
      }
    };

    const traverse = (r) => {
      if (!r) return;
      if (Array.isArray(r)) {
        r.forEach(traverse);
        return;
      }
      markExclude(r);
      if (Array.isArray(r.oneOf)) traverse(r.oneOf);
      if (Array.isArray(r.rules)) traverse(r.rules);
      if (Array.isArray(r.use)) {
        r.use.forEach((u) => {
          if (u && typeof u === 'object' && Array.isArray(u.options?.rules)) {
            traverse(u.options.rules);
          }
        });
      }
    };

    traverse(rule);
  };

  addExcludeForSourceMapLoader(config.module && config.module.rules);

  return config;
};
