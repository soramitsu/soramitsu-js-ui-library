@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'yarn',
    buildDockerImage:     'build-tools/node:14-ubuntu-cypress',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    testCmds:             ['yarn test:all'],
    pushCmds:             ['yarn publish-workspaces --no-verify-access'],
    libPushBranches:      ['master', 'next'],
    dockerImageTags:      ['master':'latest', 'next':'next'],
    libExamplesBuildCmds: ['yarn sb:build']
)
pipeline.runPipeline()
