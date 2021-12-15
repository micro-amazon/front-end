pipeline {
  agent {
      kubernetes {
        yaml '''
          apiVersion: v1
          kind: Pod
          spec:
            containers:
            - name: docker
              image: docker:1.11
              command: ['cat']
              tty: true
              volumeMounts:
              - name: dockersock
                mountPath: /var/run/docker.sock
            volumes:
            - name: dockersock
              hostPath:
                path: /var/run/docker.sock
      '''
    }
  }
  environment {
    DOCKER_HUB_AUTH = credentials('DOCKER_HUB_AUTH') // it is set by jenkins credentials
  }  
  stages {
    stage('git scm update') {
      steps {
        container('docker') {
          git url: 'https://github.com/micro-amazon/front-end.git', branch: 'master'
        }
      }
    }
    stage('docker build and push') {
      steps {
        container('docker') {
          sh '''
          docker login -u ${DOCKER_HUB_AUTH_USR} -p ${DOCKER_HUB_AUTH_PSW}
          docker build -t zwan2/micro-amazon-front-end .
          docker push zwan2/micro-amazon-front-end
          '''
        }
      }
    }
    stage('deploy kubernetes') {
      steps {
        withKubeConfig([credentialsId: 'jenkins-robot-token', serverUrl: 'https://10.0.0.5:8443', namespace: 'sock-shop']) {
          sh '''
            curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.0/bin/linux/amd64/kubectl
            chmod +x kubectl
            mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
            echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

            kubectl apply -f https://raw.githubusercontent.com/micro-amazon/micro-amazon/master/deploy/kubernetes/manifests/09-front-end-dep.yaml
            kubectl apply -f https://raw.githubusercontent.com/micro-amazon/micro-amazon/master/deploy/kubernetes/manifests/10-front-end-svc.yaml
          '''
        }
      }
    }
  }
}