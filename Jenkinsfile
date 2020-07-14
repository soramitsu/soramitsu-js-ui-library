@Library('jenkins-library@feature/js-lib' ) _

def pipeline = new org.js.LibPipeline(steps: this,
    dockerImageName: 'soramitsu/soramitsu-js-ui-library',
    libExamplesBuildCmds: ['yarn storybook:build'],
    dockerImageTags: ['feature/test-ci': 'test'],
    libPushBranches: ['feature/test-ci']
)
pipeline.runPipeline()
