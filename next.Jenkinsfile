@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'yarn',
    buildDockerImage:     'build-tools/node:14-ubuntu-cypress',
    dockerFileName:       'next.Dockerfile',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['yarn test:all'],
    pushCmds:             ['yarn publish-workspaces --no-verify-access'],
    libPushBranches:      ['feature/DOPS-1856/deploy-serve', 'next'],
    dockerImageTags:      ['feature/DOPS-1856/deploy-serve':'next-serve', 'next':'next-serve'],
    libExamplesBuildCmds: ['yarn sb:build']
)
pipeline.runPipeline()
