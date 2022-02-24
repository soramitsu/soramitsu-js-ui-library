@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:             this,
    npmLoginEmail:    'admin@soramitsu.co.jp',
    packageManager:   'yarn',
    buildDockerImage: 'build-tools/node:14-ubuntu-cypress',
    testCmds:         ['yarn test:all'],
    pushCmds:         ['yarn publish-workspaces --no-verify-access'],
    libPushBranches:  ['master', 'next'],
    dockerImageTags:  ['master':'latest', 'next':'next']
)
pipeline.runPipeline()
