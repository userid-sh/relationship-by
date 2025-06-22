import BaseRelationshipGenerator from 'generator-jhipster/generators/relationship/index.js';

export async function createGenerator() {
  return class extends BaseRelationshipGenerator {
    constructor(args, opts, features) {
      super(args, opts, {
        ...features,
        fromBlueprint: true,
      });

      this.sbsBlueprint = true; // ⚠️ side-by-side режим включён
    }

    get writing() {
      const parentWriting = super.writing ?? {};
      return {
        ...parentWriting,
        customRelationshipRules() {
          if (!this.jdlObject?.relationships) return;

          this.log('📌 Custom relationship rules parsed from JDL');
          for (const rel of this.jdlObject.relationships) {
            const comment = rel.options?.comment || rel.javadoc || '';
            const byMatch = comment.match(/by\s+([^\n]*)/i);
            const requiredByMatch = comment.match(/required\s+by\s+([^\n]*)/i);

            if (byMatch) {
              this.log(`📎 Found 'by' rule: ${byMatch[1]}`);
              rel.byRule = byMatch[1].trim();
            }
            if (requiredByMatch) {
              this.log(`🔒 Found 'required by' rule: ${requiredByMatch[1]}`);
              rel.requiredByRule = requiredByMatch[1].trim();
            }
          }
        },
      };
    }
  };
}
