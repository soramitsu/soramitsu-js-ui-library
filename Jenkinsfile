@Library('jenkins-library')
def pipeline = new org.js.LibPipeline(
    steps:                this,
    packageManager:       'pnpm',
    buildDockerImage:     'build-tools/node:14-ubuntu-cypress',
    npmLoginEmail:        'admin@soramitsu.co.jp',
    dockerImageName:      'soramitsu/soramitsu-js-ui-library',
    testCmds:             ['pnpm test:all'],
    preBuildCmds:         ['npm install -g n','n 16.17.0', 'n prune', "pnpm i -g pnpm", "pnpm install"],
    pushCmds:             ['pnpm publish-workspaces --no-verify-access'],
    libPushBranches:      ['master', 'next'],
    dockerImageTags:      ['master':'latest', 'next':'next'],
    libExamplesBuildCmds: ['pnpm sb:build']
)
pipeline.runPipeline()
