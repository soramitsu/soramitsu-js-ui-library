@Library('jenkins-library') _

def pipeline = new org.js.LibPipeline(
    steps: this,
    packageManager: 'yarn',
    testCmds: ['yarn test:all'],
    buildDockerImage: 'build-tools/node:14-ubuntu-cypress',
    // todo
    // pushCmds: [],
    // npmRegistries: ['': 'npm-soramitsu-admin'],
    // npmLoginEmail:'admin@soramitsu.co.jp'
)
pipeline.runPipeline()
