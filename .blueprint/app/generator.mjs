export async function createGenerator(env) {
  const BaseAppGenerator = await env.requireGenerator('jhipster:app');

  return class extends BaseAppGenerator {
constructor(args, opts, features) {
  super(args, opts, {
    ...features,
    fromBlueprint: true,
  });

  this.sbsBlueprint = true;

  // 🔧 Патчируем this.log, чтобы он был и функцией, и объектом
  const fallback = msg => console.log(msg);
  const logFunc = (...args) => console.log(...args);

  Object.assign(logFunc, {
    info: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    write: fallback,
    writeln: fallback,
    ok: fallback,
  });

  this.log = logFunc;


}

    // Обязательно переопределить хотя бы одну task group
    get [BaseAppGenerator.INITIALIZING]() {
      return this.asInitializingTaskGroup({
        helloTask() {
          this.log.info('👋 Hello from jhipster-relationship app generator!');
        },
      });
    }
  };
}
