# submit to build on GCloud
PROJECT=$(gcloud config list --format 'value(core.project)')
echo "BUILDING ${PROJECT}"
gcloud --project ${PROJECT} builds submit --pack=image=gcr.io/${PROJECT}/cloudrunhello,env=GOOGLE_RUNTIME="nodejs"
