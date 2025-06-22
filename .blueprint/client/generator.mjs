// eslint-disable-next-line import/prefer-default-export
export async function createGenerator(env) {
  /** @type {typeof import('generator-jhipster/generators/client').default} */
  let ClientGenerator;
  try {
    // Try to use locally installed generator-jhipster
    ClientGenerator = (await import('generator-jhipster/generators/client')).default;
  } catch {
    // Fallback to the currently running jhipster.
    const jhipsterGenerator = 'jhipster:client';
    ClientGenerator = await env.requireGenerator(jhipsterGenerator);
  }

  return class extends ClientGenerator {
    constructor(args, opts, features) {
      super(args, opts, {
        ...features,
        queueCommandTasks: true,
        checkBlueprint: true,
        // Dropped it once migration is done.
        jhipster7Migration: true,
      });
    }

    async beforeQueue() {
      await super.beforeQueue();
    }

    get [ClientGenerator.INITIALIZING]() {
      return this.asInitializingTaskGroup({
        ...super.initializing,
        async initializingTemplateTask() {},
      });
    }

    get [ClientGenerator.PROMPTING]() {
      return this.asPromptingTaskGroup({
        ...super.prompting,
        async promptingTemplateTask() {},
      });
    }

    get [ClientGenerator.CONFIGURING]() {
      return this.asConfiguringTaskGroup({
        ...super.configuring,
        async configuringTemplateTask() {},
      });
    }

    get [ClientGenerator.COMPOSING]() {
      return this.asComposingTaskGroup({
        ...super.composing,
        async composingTemplateTask() {},
      });
    }

    get [ClientGenerator.COMPOSING_COMPONENT]() {
      return this.asComposingComponentTaskGroup({
        ...super.composingComponent,
        async composingComponentTemplateTask() {},
      });
    }

    get [ClientGenerator.LOADING]() {
      return this.asLoadingTaskGroup({
        ...super.loading,
        async loadingTemplateTask() {},
      });
    }

    get [ClientGenerator.PREPARING]() {
      return this.asPreparingTaskGroup({
        ...super.preparing,
        async preparingTemplateTask() {},
      });
    }

    get [ClientGenerator.POST_PREPARING]() {
      return this.asPostPreparingTaskGroup({
        ...super.postPreparing,
        async postPreparingTemplateTask() {},
      });
    }

    get [ClientGenerator.DEFAULT]() {
      return this.asDefaultTaskGroup({
        ...super.default,
        async defaultTemplateTask() {},
      });
    }

    get [ClientGenerator.WRITING]() {
      return this.asWritingTaskGroup({
        ...super.writing,
        async writingTemplateTask({ application }) {
          await this.writeFiles({
            sections: {
              files: [{ templates: ['template-file-client'] }],
            },
            context: application,
          });
        },
      });
    }

    get [ClientGenerator.MULTISTEP_TRANSFORM]() {
      return this.asMultistepTransformTaskGroup({
        ...super.multistepTransform,
        async multistepTransformTemplateTask() {},
      });
    }

    get [ClientGenerator.POST_WRITING]() {
      return this.asPostWritingTaskGroup({
        ...super.postWriting,
        async postWritingTemplateTask() {},
      });
    }

    get [ClientGenerator.TRANSFORM]() {
      return this.asTransformTaskGroup({
        ...super.transform,
        async transformTemplateTask() {},
      });
    }

    get [ClientGenerator.INSTALL]() {
      return this.asInstallTaskGroup({
        ...super.install,
        async installTemplateTask() {},
      });
    }

    get [ClientGenerator.POST_INSTALL]() {
      return this.asPostInstallTaskGroup({
        ...super.postInstall,
        async postInstallTemplateTask() {},
      });
    }

    get [ClientGenerator.END]() {
      return this.asEndTaskGroup({
        ...super.end,
        async endTemplateTask() {},
      });
    }
  };
}
