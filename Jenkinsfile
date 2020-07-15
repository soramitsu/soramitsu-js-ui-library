@Library('jenkins-library' ) _

def pipeline = new org.js.LibPipeline(steps: this,
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build'])
pipeline.runPipeline()
