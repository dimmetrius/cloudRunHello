PROJECT=$(gcloud config list --format 'value(core.project)')
echo "BUILDING ${PROJECT}"
gcloud --project ${PROJECT} run deploy cloudrunhello --image=gcr.io/${PROJECT}/cloudrunhello --region=us-central1 --platform=managed
