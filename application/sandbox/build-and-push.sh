VERSIONS=$(cat versions.txt)
echo $VERSIONS
for VERSION in $VERSIONS
do
    status_code=$(curl --write-out "%{http_code}\n" --silent --output /dev/null "https://hub.docker.com/v2/repositories/mtharrison/deno-playground-sandbox/tags/$VERSION")
    if [[ "$status_code" -ne 200 ]] ; then
        docker build --build-arg DENO_VERSION=$VERSION -t mtharrison/deno-playground-sandbox:$VERSION .
        docker push mtharrison/deno-playground-sandbox:$VERSION
        echo "Tag $VERSION finished pushing"
    else
        echo "Tag $VERSION already pushed"
    fi
done
