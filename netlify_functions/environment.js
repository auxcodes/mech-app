

function currentEnv() {
    return process.env.BUILD_CONTEXT === 'dev' ? 'dev' : 'prod';
}