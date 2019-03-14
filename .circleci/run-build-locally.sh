curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=0ca6bf9d462fd646bfd8ef9e49a6bf2dec4ca23a\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/riyavsinha/soulsaga/tree/testing
