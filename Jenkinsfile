@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'pnpm',
    buildDockerImage:     'build-tools/node:16-cypress-corepack',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['pnpm test:all'],
    //preBuildCmds:         ['corepack prepare pnpm'],
    pushCmds:             ['pnpm publish-workspaces --no-verify-access'],
    libPushBranches:      ['master', 'next'],
    dockerImageTags:      ['master':'latest', 'next':'next'],
    libExamplesBuildCmds: ['pnpm sb:build']
)
pipeline.runPipeline()
