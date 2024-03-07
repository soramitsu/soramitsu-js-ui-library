@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'yarn',
    buildDockerImage:     'build-tools/node:16-ubuntu-cypress',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    dockerFileName:       'next.Dockerfile',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['yarn test:all'],
    pushCmds:             ['yarn publish-workspaces --no-verify-access'],
    libPushBranches:      ['feature/DOPS-3043/fix-security'],
    dockerImageTags:      ['feature/DOPS-3043/fix-security':'next-test'],
    libExamplesBuildCmds: ['yarn sb:build']
)
pipeline.runPipeline()
