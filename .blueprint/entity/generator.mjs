import EntityGenerator from 'generator-jhipster/generators/entity/index.js';

export default class extends EntityGenerator {
  constructor(args, opts, features) {
    super(args, { ...opts, fromBlueprint: true }, features);
    this.sbsBlueprint = true;
  }

  // Стандартная конфигурация
  get configuring() {
    return super.configuring;
  }

  // Добавление логов, если хочешь отследить вызов генерации
  get initializing() {
    return {
      ...super.initializing,
      logStart() {
        this.log(`📦 Генерация сущности "${this.entityName}" началась (blueprint).`);
      },
    };
  }

  // Стандартная генерация файлов + свои шаблоны (если нужно)
  get writing() {
    return {
      ...super.writing,

      // Пример своей генерации (можешь убрать, если не нужно)
      myCustomFiles() {
        this.template(
          'template-file-entity.ejs',
          `${this.packageFolder}/domain/custom-${this.entityInstance}.txt`
        );
      },
    };
  }

  // Опционально: вывод завершения
  get end() {
    return {
      ...super.end,
      doneMessage() {
        this.log(`✅ Сущность "${this.entityName}" успешно сгенерирована.\n`);
      },
    };
  }
}
