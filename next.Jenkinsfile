@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'yarn',
    buildDockerImage:     'build-tools/node:14-ubuntu-cypress',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['yarn test:all'],
    pushCmds:             ['yarn publish-workspaces --no-verify-access'],
    libPushBranches:      ['next'],
    dockerImageTags:      ['next':'next'],
    libExamplesBuildCmds: ['yarn sb:serve']
)
pipeline.runPipeline()
