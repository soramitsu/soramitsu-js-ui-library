@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'pnpm',
    buildDockerImage:     'build-tools/node:16-ubuntu-cypress',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['pnpm test:all'],
    pushCmds:             ['pnpm publish-workspaces --no-verify-access'],
    libPushBranches:      ['master', 'next'],
    dockerImageTags:      ['master':'latest', 'next':'next'],
    libExamplesBuildCmds: ['pnpm sb:build']
)
pipeline.runPipeline()
