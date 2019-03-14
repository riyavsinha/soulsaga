curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=416dfbbf1fa2c5be6b0693249ae85637598c6423\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/riyavsinha/soulsaga/tree/testing
