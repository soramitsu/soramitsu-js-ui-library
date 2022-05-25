@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline(steps: this,
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build']),
    sonarProjectName: 'soramitsu-js-ui-library',
    sonarProjectKey: 'jp.co.soramitsu:soramitsu-js-ui-library'
pipeline.runPipeline()
