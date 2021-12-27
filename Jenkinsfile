@Library('jenkins-library') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    packageManager: 'yarn',
    testCmds: ['yarn test:all'],
    buildDockerImage: 'build-tools/node:14-ubuntu-cypress',
    pushCmds: ['yarn publish-workspaces --no-verify-access'],
    npmLoginEmail:'admin@soramitsu.co.jp')
pipeline.runPipeline()
