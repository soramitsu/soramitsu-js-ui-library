@Library('jenkins-library' ) _

// Job properties
def jobParams = [
  booleanParam(defaultValue: false, description: 'publish packages', name: 'publish'),
]

def pipeline = new org.js.LibPipeline(steps: this,
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build'],
    sonarProjectName: 'soramitsu-js-ui-library',
    sonarProjectKey: 'jp.co.soramitsu:soramitsu-js-ui-library',
    jobParams: jobParams
    )
pipeline.runPipeline()
