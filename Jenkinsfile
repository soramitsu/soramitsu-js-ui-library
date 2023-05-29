@Library('jenkins-library@feature/DOPS-2406-limit-the-execution' ) _

def pipeline = new org.js.LibPipeline(steps: this,
    buildDockerImage: 'build-tools/node:14-ubuntu',
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build'],
    sonarProjectName: 'soramitsu-js-ui-library',
    sonarProjectKey: 'jp.co.soramitsu:soramitsu-js-ui-library',
    timeoutOption: '2'
    )
pipeline.runPipeline()
