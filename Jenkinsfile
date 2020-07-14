@Library('jenkins-library@feature/js-lib' ) _

def pipeline = new org.js.LibPipeline(steps: this,
    libExamples: true,
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build']
)
pipeline.runPipeline()
