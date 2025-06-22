// eslint-disable-next-line import/prefer-default-export
export async function createGenerator(env) {
  /** @type {typeof import('generator-jhipster/generators/server').default} */
  let ServerGenerator;
  try {
    // Try to use locally installed generator-jhipster
    ServerGenerator = (await import('generator-jhipster/generators/server')).default;
  } catch {
    // Fallback to the currently running jhipster.
    const jhipsterGenerator = 'jhipster:server';
    ServerGenerator = await env.requireGenerator(jhipsterGenerator);
  }

  return class extends ServerGenerator {
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

    get [ServerGenerator.INITIALIZING]() {
      return this.asInitializingTaskGroup({
        ...super.initializing,
        async initializingTemplateTask() {},
      });
    }

    get [ServerGenerator.PROMPTING]() {
      return this.asPromptingTaskGroup({
        ...super.prompting,
        async promptingTemplateTask() {},
      });
    }

    get [ServerGenerator.CONFIGURING]() {
      return this.asConfiguringTaskGroup({
        ...super.configuring,
        async configuringTemplateTask() {},
      });
    }

    get [ServerGenerator.COMPOSING]() {
      return this.asComposingTaskGroup({
        ...super.composing,
        async composingTemplateTask() {},
      });
    }

    get [ServerGenerator.COMPOSING_COMPONENT]() {
      return this.asComposingComponentTaskGroup({
        ...super.composingComponent,
        async composingComponentTemplateTask() {},
      });
    }

    get [ServerGenerator.LOADING]() {
      return this.asLoadingTaskGroup({
        ...super.loading,
        async loadingTemplateTask() {},
      });
    }

    get [ServerGenerator.PREPARING]() {
      return this.asPreparingTaskGroup({
        ...super.preparing,
        async preparingTemplateTask() {},
      });
    }

    get [ServerGenerator.POST_PREPARING]() {
      return this.asPostPreparingTaskGroup({
        ...super.postPreparing,
        async postPreparingTemplateTask() {},
      });
    }

    get [ServerGenerator.DEFAULT]() {
      return this.asDefaultTaskGroup({
        ...super.default,
        async defaultTemplateTask() {},
      });
    }

    get [ServerGenerator.WRITING]() {
      return this.asWritingTaskGroup({
        ...super.writing,
        async writingTemplateTask({ application }) {
          await this.writeFiles({
            sections: {
              files: [{ templates: ['template-file-server'] }],
            },
            context: application,
          });
        },
      });
    }

    get [ServerGenerator.MULTISTEP_TRANSFORM]() {
      return this.asMultistepTransformTaskGroup({
        ...super.multistepTransform,
        async multistepTransformTemplateTask() {},
      });
    }

    get [ServerGenerator.POST_WRITING]() {
      return this.asPostWritingTaskGroup({
        ...super.postWriting,
        async postWritingTemplateTask() {},
      });
    }

    get [ServerGenerator.TRANSFORM]() {
      return this.asTransformTaskGroup({
        ...super.transform,
        async transformTemplateTask() {},
      });
    }

    get [ServerGenerator.INSTALL]() {
      return this.asInstallTaskGroup({
        ...super.install,
        async installTemplateTask() {},
      });
    }

    get [ServerGenerator.POST_INSTALL]() {
      return this.asPostInstallTaskGroup({
        ...super.postInstall,
        async postInstallTemplateTask() {},
      });
    }

    get [ServerGenerator.END]() {
      return this.asEndTaskGroup({
        ...super.end,
        async endTemplateTask() {},
      });
    }
  };
}
