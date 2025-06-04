pipeline {
    agent {
        docker {
            image 'martyna0901/custom-jenkins-build-agent:1.0.1'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds-id')
        IMAGE_NAME = "martyna0901/express-api"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Martyna-Zmi/jenkins-example.git', branch: 'master'
            }
        }

        stage('Parallel Testing & Coverage') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm install'
                        sh 'npm run test:unit -- --coverage'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                junit 'reports/**/*.xml'
            }
        }

        stage('Build Application Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${env.IMAGE_NAME}:${env.BUILD_NUMBER} -t ${env.IMAGE_NAME}:latest app/
                    """
                }
            }
        }

        stage('Push Application Image to Docker Hub') {
            steps {
                script {
                    sh 'echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin'
                    sh """
                        docker push ${env.IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker push ${env.IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Build completed.'

        }
        success {
            echo 'Build & deploy completed successfully.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
