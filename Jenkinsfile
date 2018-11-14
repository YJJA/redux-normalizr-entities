pipeline {
  agent {
    docker {
      image 'node:8.9-alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'echo \'Testing\''
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo \'Deploying\''
      }
    }
  }
}